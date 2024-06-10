import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import CustomBtn from '../../components/customBtn/CustomBtn'
import { loadStripe } from '@stripe/stripe-js';
import useAuthSecure from '../../hooks/useAuthSecure';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { IoTrendingUp } from 'react-icons/io5';
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHER_KEY)
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const authSecure = useAuthSecure();
  const { user, setUser } = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [isCoupon, setIsCoupon] = useState(false);
  const [amount, setAmount] = useState(100);

  const handleSubmit = async (event) => {
    console.log('clicked')
    event.preventDefault();
    setIsProcessing(true);

    const response = await authSecure.post('/create-payment-intent', { customerEmail: user?.email,amount });

    const { clientSecret } = response.data;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email: user?.email,
        },
      },
    });

    if (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })

      setIsProcessing(false);
    } else {

      console.log('Payment successful!', paymentIntent);
      const response = await authSecure.post("/payment/subscribe", { paymentIntentId: paymentIntent.id, uid: user.uid })
      setUser({ ...user, isSubscribed: true })
      if (response.data.success) {
        toast.success('Subscription done!', {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
          transition: Bounce,
        })
      }
      setIsProcessing(false);
    }
  };

  const handleCouponCode = async () => {
    console.log({ coupon })
    const response = await authSecure.post("/use/coupon", { coupon })
    if (response.status == 200) {
      console.log(response.data);
      setAmount(response.data)
      toast.success('wow,you get a discount!', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      })
      setCoupon("");
      setIsCoupon(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>

      <div className='flex items-center justify-between gap-4'>
        <p className='text-lg font-bold hover:text-themePrimary underline cursor-pointer' onClick={() => setIsCoupon(!isCoupon)}>Have any coupon code?</p>

      </div>
      {
        isCoupon && <>
          <div className='w-full flex'>
            <input type="text" name='coupon' id='name' placeholder='Enter your coupon' className='input w-full' onChange={(e) => setCoupon(e.target.value)} />
            <button type='button' className='btn btn-accent' onClick={handleCouponCode}>Add Coupon</button>
          </div>
        </>
      }
      <div className=' flex flex-col items-start gap-2 w-full'>
        <input
          type="email"
          placeholder="Email"
          value={user?.email}
          disabled={true}
          onChange={(e) => setEmail(e.target.value)}
          required
          className='input w-full'
        />
      </div>
      <CardElement />
      <CustomBtn btnType="submit" disabled={!stripe || !elements || isProcessing} text={isProcessing ? 'Processing...' : `Pay $${amount}`}>
      </CustomBtn>
    </form>
  );
};



const MyProfile = () => {
  const { user } = useAuth();
  const [isWantedSubscribe, setIsWantedSubscribe] = useState(false);

  return (
    <div className='w-full  min-h-screen'>
      <ToastContainer />

      <div className='w-full flex flex-col items-center justify-start  gap-8 lg:mt-24'>
        <div className=''>
          <img src={user.photoURL} alt="" className='w-24 h-24' />
        </div>
        <div className='flex-1 flex flex-col items-center justify-center text-center gap-4 '>
          {/* <img src={user.photoURL} alt="" className='w-full' /> */}
          <h1 className='text-5xl font-bold'>{user?.displayName}</h1>
          <p className='text-lg fontsemibold'>{user?.email}</p>
          {
            user?.isSubscribed ? <p>Status: <span className='text-themePrimary'>Verified</span></p> : <>
              {
                !isWantedSubscribe && <span onClick={() => setIsWantedSubscribe(!isWantedSubscribe)}><CustomBtn text={"Subscribe"} ></CustomBtn></span>
              }
              {
                isWantedSubscribe && <>

                  <Elements stripe={stripePromise}>
                    <CheckoutForm />
                  </Elements>
                </>
              }
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile