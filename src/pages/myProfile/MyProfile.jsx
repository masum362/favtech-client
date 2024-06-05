import React, { useState } from 'react'
import useAuth from '../../hooks/useAuth'
import CustomBtn from '../../components/customBtn/CustomBtn'
import { loadStripe } from '@stripe/stripe-js';
import useAuthSecure from '../../hooks/useAuthSecure';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
const stripePromise =  loadStripe(import.meta.env.VITE_STRIPE_PUBLISHER_KEY)

const CheckoutForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const authSecure = useAuthSecure();
  const [email, setEmail] = useState('');
  const {user} = useAuth();
  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsProcessing(true);

    const response = await authSecure.post('/create-payment-intent',{customerEmail:user?.email});

    const { clientSecret } =  response.data;

    const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          email:user?.email,
        },
      },
    });

    if (error) {
      console.error(error.message);
      setIsProcessing(false);
    } else {
      console.log('Payment successful!', paymentIntent);
      setIsProcessing(false);
      // Optionally, you can redirect to a success page or show a success message
    }
  };

  return (
    <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
      <input
        type="email"
        placeholder="Email"
        value={user?.email}
        disabled={true}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <CardElement />
      <CustomBtn btnType="submit" disabled={!stripe || !elements || isProcessing} text={ isProcessing ? 'Processing...' : 'Pay $50'}>
      </CustomBtn>
    </form>
  );
};



const MyProfile = () => {
  const { user } = useAuth();
  const authSecure = useAuthSecure();
  const [isProcessing, setIsProcessing] = useState(false);
  console.log(user)

  // const handlePayment = async () => {
   
  //   const response = await authSecure.post("/create-payment-intent", { customerEmail: user?.email })
  //   console.log({ response })
  //   if (response.status = 200) {
  //     const { clientSecret } = response.data;
  //     const { error, paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
  //       payment_method: {
  //         card: elements.getElement(CardElement),
  //         billing_details: {
  //           email: user?.email,
  //         },
  //       },
  //     });

  //     if (error) {
  //       console.error(error.message);
  //       setIsProcessing(false);
  //     } else {
  //       console.log('Payment successful!', paymentIntent);
  //       setIsProcessing(false);
  //       // Optionally, you can redirect to a success page or show a success message
  //     }
  //     console.log(result);
  //   } else {
  //     console.log("something went wrong")
  //   }
  // }
  return (
    <div className='w-full  min-h-screen'>

      <div className='w-full flex flex-col items-center justify-start  gap-8 lg:mt-24'>
        <div className=''>
          <img src={user.photoURL} alt="" className='w-24 h-24' />
        </div>
        <div className='flex-1 flex flex-col items-center justify-center text-center gap-4 '>
          {/* <img src={user.photoURL} alt="" className='w-full' /> */}
          <h1 className='text-5xl font-bold'>{user?.displayName}</h1>
          <p className='text-lg fontsemibold'>{user?.email}</p>
          {
            user?.isSubscribed ? <p>Status:Verified</p> : <>
              {/* <span onClick={handlePayment}><CustomBtn text={"Subscribe"} ></CustomBtn></span> */}
              <p>{isProcessing ? 'Processing...' : 'Pay $50'}</p>
              <Elements stripe={stripePromise}>
                <CheckoutForm />
              </Elements>
            </>
          }
        </div>
      </div>
    </div>
  )
}

export default MyProfile