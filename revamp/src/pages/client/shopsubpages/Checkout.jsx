import React, { useEffect, useState } from 'react'
import MiniHerosection from '../../../components/MiniHerosection'
import { assets } from '../../../assets/assets'
import { useFormik } from 'formik'
import * as Yup from "yup";
import { MdArrowRightAlt } from 'react-icons/md';
import api from '../../../api';
import { toast } from 'sonner';
import axios from 'axios';

const Checkout = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [loadingCountries, setLoadingCountries] = useState(false);
  const [loadingStates, setLoadingStates] = useState(false);
  const [loadingCities, setLoadingCities] = useState(false);
  const [addressConfirmed, setAddressConfirmed] = useState(false);
  const [confirmedAddress, setConfirmedAddress] = useState(null);
  const [addressId, setAddressId] = useState(null);

  useEffect(() => {
    window.scroll(0, 0)
  }, [])

  const formik = useFormik({
    initialValues: {
      full_name: "",
      phone: "",
      address_line: "",
      country: "",
      state: "",
      city: "",
      postal: "",
    },
    validationSchema: Yup.object({
      full_name: Yup.string()
        .required("First Name is required!."),
      phone: Yup.string()
        .required("Phone Number is required!."),
      address_line: Yup.string()
        .required("Address is required!."),
      country: Yup.string()
        .required("Country is required!."),
      state: Yup.string()
        .required("State is required!."),
      city: Yup.string()
        .required("City is required!."),
      postal: Yup.string()
        .required("Postal Code is required!."),
    }),
    onSubmit: async (values) => {
      setIsSubmitting(true);
      try {
        const response = await api.call('/addresses', 'POST', values);
        console.log("address response", response)
        if (response) {
          toast.success(response?.data?.message || 'Address saved successfully!');
          setConfirmedAddress(values);
          console.log("response.data.address.id",response.data.address.id)
          setAddressId(response.data.address.id)
          setAddressConfirmed(true);
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || 'Failed to save address.');
        console.error('Error saving address:', error);
      } finally {
        setIsSubmitting(false);
      }
    }
  })

  const handleProceedToPayment = async () => {
    setIsSubmitting(true);
    try {
      const response = await api.call('/order/checkout', 'POST', { address_id : addressId });
      console.log("response", response)
      if (response.status === 200 && response.data.payment_url) {
        toast.success(response.data.message || "Order created successfully, redirecting to payment page...")
        window.location.href = response.data.payment_url;
      }
    } catch (error) {
      toast.error('Failed to proceed to payment.');
      console.error('Error proceeding to payment:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const fetchCountries = async () => {
      setLoadingCountries(true);
      try {
        const response = await axios.get('https://countriesnow.space/api/v0.1/countries/states');
        setCountries(response.data.data);
      } catch (error) {
        toast.error('Failed to fetch countries.');
      } finally {
        setLoadingCountries(false);
      }
    };
    fetchCountries();
  }, []);

  useEffect(() => {
    if (formik.values.country) {
      const selectedCountry = countries.find(c => c.name === formik.values.country);
      if (selectedCountry) {
        setStates(selectedCountry.states);
        setCities([]);
        formik.setFieldValue('state', '');
        formik.setFieldValue('city', '');
      }
    }
  }, [formik.values.country, countries]);

  useEffect(() => {
    if (formik.values.state) {
      const fetchCities = async () => {
        setLoadingCities(true);
        try {
          const response = await axios.post('https://countriesnow.space/api/v0.1/countries/state/cities', {
            country: formik.values.country,
            state: formik.values.state
          });
          setCities(response.data.data);
          formik.setFieldValue('city', '');
        } catch (error) {
          toast.error('Failed to fetch cities.');
        } finally {
          setLoadingCities(false);
        }
      };
      fetchCities();
    }
  }, [formik.values.state, formik.values.country]);
  
  return (
    <div>
      <MiniHerosection
        title={"Checkout"}
        subText={"Secure Checkout with OMC Multitech Limited. Review your order, enter delivery details, and make payment. We'll deliver your premium paints and solutions promptly. Thank you for shopping with us!."}
        bgStyle={{
            backgroundImage: `linear-gradient(135deg, #000000ba, #000000ba), url(${assets.checkimg})`,
            backgroundSize: "cover",
            backgroundPosition: "bottom",
        }}
      />
      <div className="made-container pt-20 lg:pb-20">
        {addressConfirmed ? (
          <div className='rounded-2xl bg-white shadow-md md:p-8 p-4 space-y-4'>
            <h3 className='col-span-12 font-[Montserrat]! font-bold! md:text-3xl text-xl'>Confirm Delivery Details</h3>
            <div className='space-y-2'>
              <p><strong>Full Name:</strong> {confirmedAddress.full_name}</p>
              <p><strong>Phone:</strong> {confirmedAddress.phone}</p>
              <p><strong>Address:</strong> {confirmedAddress.address_line}</p>
              <p><strong>City:</strong> {confirmedAddress.city}</p>
              <p><strong>State:</strong> {confirmedAddress.state}</p>
              <p><strong>Country:</strong> {confirmedAddress.country}</p>
              <p><strong>Postal Code:</strong> {confirmedAddress.postal}</p>
            </div>
            <button
              onClick={handleProceedToPayment}
              disabled={isSubmitting}
              className="col-span-12 rounded-lg bg-primary h-[50px] w-full px-4 text-base text-light cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : (
                <>
                  <span>Proceed to Payment</span>
                  <MdArrowRightAlt className="text-lg" />
                </>
              )}
            </button>
          </div>
        ) : (
          <form onSubmit={formik.handleSubmit} className='rounded-2xl bg-white shadow-md md:p-8 p-4 space-y-4 grid grid-cols-12 gap-y-2 gap-x-6'>
            <h3 className='col-span-12 font-[Montserrat]! font-bold! md:text-3xl text-xl'>Delivery Details</h3>
            <div className="flex flex-col gap-1 col-span-12 md:col-span-6">
              <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="full_name">Enter your Name</label>
              <input 
                type="text" 
                name="full_name" 
                id="full_name" 
                autoComplete='given-name'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-primary indent-2 rounded-md outline-0 py-2.5'
              />
              {formik.touched.full_name && formik.errors.full_name && (<p className='text-red-600 text-sm'>{formik.errors.full_name}</p>)}
            </div>
            <div className="flex flex-col gap-1 col-span-12 md:col-span-6">
              <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="phone">Enter your phone number</label>
              <input 
                type="tel" 
                name="phone" 
                id="phone" 
                autoComplete='tel'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-primary indent-2 rounded-md outline-0 py-2.5'
              />
              {formik.touched.phone && formik.errors.phone && (<p className='text-red-600 text-sm'>{formik.errors.phone}</p>)}
            </div>
            <div className="flex flex-col gap-1 col-span-12 md:col-span-6">
              <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="address_line">Enter preferred address</label>
              <input 
                type="text" 
                name="address_line" 
                id="address_line"
                autoComplete='address-line1'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-primary indent-2 rounded-md outline-0 py-2.5'
              />
              {formik.touched.address_line && formik.errors.address_line && (<p className='text-red-600 text-sm'>{formik.errors.address_line}</p>)}
            </div>
            <div className="flex flex-col gap-1 col-span-12 md:col-span-6">
              <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="postal">Enter your postal code</label>
              <input
                type='text'
                name="postal" 
                id="postal"
                autoComplete='postal-code'
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-primary indent-2 rounded-md outline-0 py-2.5'
              />
              {formik.touched.postal && formik.errors.postal && (<p className='text-red-600 text-sm'>{formik.errors.postal}</p>)}
            </div>
            <div className="flex flex-col gap-1 col-span-12 md:col-span-4">
              <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="country">Select your country</label>
              <select
                name="country" 
                id="country"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-primary indent-2 rounded-md outline-0 py-3.5'
                disabled={loadingCountries}
              >
                  <option value="">{loadingCountries ? 'Loading...' : 'Select Country'}</option>
                  {countries.map(country => (
                    <option key={country.iso3} value={country.name}>{country.name}</option>
                  ))}
              </select>
              {formik.touched.country && formik.errors.country && (<p className='text-red-600 text-sm'>{formik.errors.country}</p>)}
            </div>
            <div className="flex flex-col gap-1 col-span-12 md:col-span-4">
              <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="state">Select your state</label>
              <select
                name="state" 
                id="state"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-primary indent-2 rounded-md outline-0 py-3.5'
                disabled={!formik.values.country || loadingStates}
              >
                  <option value="">{loadingStates ? 'Loading...' : 'Select State'}</option>
                  {states.map(state => (
                    <option key={state.name} value={state.name}>{state.name}</option>
                  ))}
              </select>
              {formik.touched.state && formik.errors.state && (<p className='text-red-600 text-sm'>{formik.errors.state}</p>)}
            </div>
            <div className="flex flex-col gap-1 col-span-12 md:col-span-4">
              <label className="font-[Montserrat]! font-medium! text-dark/90" htmlFor="city">Select your city</label>
              <select
                name="city" 
                id="city"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                className='border border-primary indent-2 rounded-md outline-0 py-3.5'
                disabled={!formik.values.state || loadingCities}
              >
                  <option value="">{loadingCities ? 'Loading...' : 'Select City'}</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
              </select>
              {formik.touched.city && formik.errors.city && (<p className='text-red-600 text-sm'>{formik.errors.city}</p>)}
            </div>
            <button
              type="submit"
              disabled={!formik.isValid || isSubmitting}
              className="mt-6 col-span-12 rounded-lg bg-primary h-[50px] w-full px-4 text-base text-light cursor-pointer flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : (
                <>
                  <span>Confirm Delivery Details</span>
                  <MdArrowRightAlt className="text-lg" />
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}

export default Checkout