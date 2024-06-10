<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Order;
use App\Models\Product;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    public function checkout($order_id)
    {
        $order = Order::with('order_items.product')->find($order_id);
        // return $order;
        $vnp_Url = "https://sandbox.vnpayment.vn/paymentv2/vpcpay.html";
        $vnp_Returnurl = url('vn-pay-bill');
        $vnp_TmnCode = "PY794GHE"; //Mã website tại VNPAY 
        $vnp_HashSecret = "7CSW3GKZE6V29EQJXGBMOVU60VPDMGEU"; //Chuỗi bí mật

        $vnp_TxnRef = date("YmdHis");
        $vnp_OrderInfo = "Pay order:" . $order->id;
        $vnp_OrderType = "Media store";
        $vnp_Amount = $order->total_price * 100;
        $vnp_Locale = 'us';
        $vnp_BankCode = 'NCB';
        $vnp_IpAddr = $_SERVER['REMOTE_ADDR'];

        $inputData = array(
            "vnp_Version" => "2.1.0",
            "vnp_TmnCode" => $vnp_TmnCode,
            "vnp_Amount" => $vnp_Amount,
            "vnp_Command" => "pay",
            "vnp_CreateDate" => date('YmdHis'),
            "vnp_CurrCode" => "VND",
            "vnp_IpAddr" => $vnp_IpAddr,
            "vnp_Locale" => $vnp_Locale,
            "vnp_OrderInfo" => $vnp_OrderInfo,
            "vnp_OrderType" => $vnp_OrderType,
            "vnp_ReturnUrl" => $vnp_Returnurl,
            "vnp_TxnRef" => $vnp_TxnRef,
        );

        if (isset($vnp_BankCode) && $vnp_BankCode != "") {
            $inputData['vnp_BankCode'] = $vnp_BankCode;
        }
        if (isset($vnp_Bill_State) && $vnp_Bill_State != "") {
            $inputData['vnp_Bill_State'] = $vnp_Bill_State;
        }

        //var_dump($inputData);
        ksort($inputData);
        $query = "";
        $i = 0;
        $hashdata = "";
        foreach ($inputData as $key => $value) {
            if ($i == 1) {
                $hashdata .= '&' . urlencode($key) . "=" . urlencode($value);
            } else {
                $hashdata .= urlencode($key) . "=" . urlencode($value);
                $i = 1;
            }
            $query .= urlencode($key) . "=" . urlencode($value) . '&';
        }

        $vnp_Url = $vnp_Url . "?" . $query;
        if (isset($vnp_HashSecret)) {
            $vnpSecureHash =   hash_hmac('sha512', $hashdata, $vnp_HashSecret); //  
            $vnp_Url .= 'vnp_SecureHash=' . $vnpSecureHash;
        }
        $returnData = array(
            'code' => '00', 'message' => 'success', 'data' => $vnp_Url
        );
        header('Location: ' . $vnp_Url);

        return Inertia::location($vnp_Url);
    }

    public function getBill(Request $request)
    {
        $order_info = $request->vnp_OrderInfo;
        $order_id = explode(':', $order_info)[1];

        $order = Order::find($order_id);
        $status = $request->vnp_TransactionStatus;
        if ($status == 00) {
            // Disable events temporarily and update the order
            Order::withoutEvents(
                function () use ($order) {
                    $order->update([
                        'status' => 'paid',
                    ]);
                    $order->delivery->update([
                        'status' => 'in progress',
                    ]);
                    $order->payment->update([
                        'paid_at' => now(),
                    ]);
                }
            );
            return to_route('order.index')->with('success', 'Payment successfully');
        } else {
            Order::withoutEvents(
                function () use ($order) {
                    $order->update([
                        'status' => 'failed',
                    ]);
                }
            );
            return to_route('order.index')->with('fail', 'Payment failed');
        }
    }
}
