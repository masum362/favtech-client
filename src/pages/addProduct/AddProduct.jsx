import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import CustomBtn from '../../components/customBtn/CustomBtn';
import { TiDelete } from "react-icons/ti";
import useAuthSecure from '../../hooks/useAuthSecure';
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';


const AddProduct = () => {

  const [image, setImage] = useState("")
  const { handleSubmit, register, setValue, formState: { errors } } = useForm();
  const [loading, setLoading] = useState(false)
  const [tags, setTags] = useState([])
  const [tag, setTag] = useState("")
  const authSecure = useAuthSecure();
  const navigate = useNavigate();

  useEffect(() => {
    register("imageURL", { required: "image is required" })
    setValue("imageURL", image)
    register("tags", { required: "tags is required" })
    setValue("tags", tags)
  }, [image, tags])

  const handleFileUpload = async (image) => {
    console.log({ image })
    if (image === undefined) {
      console.log("not selected image")
    } else {
      setLoading(true);
      const formData = new FormData();
      formData.append("image", image);
      const imageUrl = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_API_KEY
        }`,
        formData)
      try {
        setImage(imageUrl.data.data.url)
        console.log(imageUrl.data.data.url)
        // setValue("image", imageUrl.data.data.url)
        setLoading(false)
      } catch (error) {
        console.log(error)
        setLoading(false)
      }

    }
  }

  const handleTag = (value) => {
    setTag(value);
  }

  const isAlreadyTag = (value) => {
    const isTag = tags.filter(tag => tag === value);
    console.log(isTag.length);
    return isTag.length > 0 ? true : false
  }


  const handleTags = () => {
    console.log("called")
    if (tag === "") {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Empty Tag!",
        // footer: '<a href="#">Why do I have this issue?</a>'
      });
    } else {
      const AlreadyTag = isAlreadyTag(tag)
      if (AlreadyTag) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This Tag already Been added!",
          // footer: '<a href="#">Why do I have this issue?</a>'
        });
      } else {
        setTags([...tags, tag])
        setTag("")
        // setValue("tags",[...tags, tag])
      }
    }
  };

  const handleDeleteTag = (value) => {
    const filteredTags = tags.filter(tag => tag !== value);
    setTags(filteredTags);
  }


  const handleFormSubmit = async (data) => {
    console.log(data);
    const response = await authSecure.post("/add-product", { product: data })
    try {
      if (response.status === 200) {
        Swal.fire({
          title: "Product added successfully",
          icon: "success"
        });
        navigate("/user/my-products")
      }
      else if(response.status === 204) {
        Swal.fire({
          title: "You are not eligible to do this.",
          text:"you are not a subscribed member that's why you are not eligible to add more products then 1.if you want to add unlimited products then please subscribe by paying your subscription fees",
          icon: "warning"
        });
      } 
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }

  }








  return (
    <div>
      <h1 className='text-2xl md:text-5xl font-bold text-center'>Add New Product</h1>
      <div className='flex flex-col items-center justify-center lg:my-12' >

        <div className='max-w-xl w-full bg-slate-50 p-4 shadow-lg rounded-lg' >
          <form className='w-full space-y-4 my-8 ' onSubmit={handleSubmit(handleFormSubmit)}>
            <div className='w-full  h-full flex items-center justify-center m-4'>
              {
                image && <img src={image} alt="imageUrl" className='w-48 h-48 object-cover' />
              }
            </div>
            <div className='w-full '>
              <input type="file" className="file-input w-full " files={image ? image : ""} onChange={(e) => handleFileUpload(e.target.files[0])} />
              {
                errors?.imageURL && <span className='text-red-500'>{errors.imageURL?.message}</span>
              }
            </div>
            <div className='flex flex-col w-full '>
              <label htmlFor="name">Name:</label>
              <input type="text" name="name" id="name" plexternalaceholder="Type here" className="input input-bordered w-full " {...register("name", {
                required: 'name must be required.'
              })} />
              {
                errors?.name && <span className='text-red-500'>{errors.name?.message}</span>
              }
            </div>

            <div className='flex flex-col w-full '>
              <label htmlFor="description">Description:</label>
              <input type="text" name="description" id="description" placeholder="Type here" className="input input-bordered w-full "  {...register("description", {
                required: 'description must be required.'
              })} />
              {
                errors?.description && <span className='text-red-500'>{errors.description?.message}</span>
              }
            </div>
            <div className='flex flex-col w-full '>
              <label htmlFor="external-links">External Links:</label>
              <input type="text" name="external-links" id="external-links" placeholder="Type here" className="input input-bordered w-full "  {...register("external_links", {
                required: 'external links must be required.'
              })} />
              {
                errors?.external_links && <span className='text-red-500'>{errors.external_links?.message}</span>
              }
            </div>
            <div className='flex flex-col w-full '>

              <label htmlFor="tags" >Tags:</label>
              <div className='w-full  grid grid-cols-1 md:grid-cols-3 gap-2'>
                {
                  tags?.map((tag, i) => {
                    return <span key={i} className='border bg-transparent font-semibold text-md px-4 py-2 lg:my-4 mby-2'>{tag} <button onClick={() => handleDeleteTag(tag)}>< TiDelete /></button></span>
                  })
                }
              </div>
              <div className='w-full  flex items-center '>
                <input type="text" name="tags" id="tags" placeholder="Type here" onChange={(e) => handleTag(e.target.value)} className="input input-bordered w-full " value={tag} />
                <span onClick={handleTags}><CustomBtn style={"bg-slate-900"} btnType={"button"} text={"Add"}></CustomBtn></span>
              </div>
              {
                errors?.tags && <span className='text-red-500'>{errors.tags?.message}</span>
              }

            </div>



            {!loading ? <CustomBtn btnType={"submit"} text={"Submit"} style={"w-full"} /> : <div className='text-themePrimary'>
              <span className="loading loading-ball loading-xs"></span>
              <span className="loading loading-ball loading-sm"></span>
              <span className="loading loading-ball loading-md"></span>
              <span className="loading loading-ball loading-lg"></span>

            </div>
            }

          </form>
        </div>
      </div>
    </div>
  )
}

export default AddProduct