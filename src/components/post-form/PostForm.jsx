import React, { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";

import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Input from "../Input"
import Button from "../Button";
import RTE from "../RTE";
import Select from "../Select";


function PostForm({post}) {
  const {register,handleSubmit,control,watch,getValues,setValue} =useForm({
    defaultValues:{
      title: post?.title||"",
      slug: post?.slug||"",
      content: post?.content||"",
      status : post?.status||"active",
    }
  })
  const navigate = useNavigate();
  const userData = useSelector(state=>state.auth.userData)

  const submit = async(data)=>{
    if(post){
    const file =  data.image[0] ? await appwriteService.uploadFile(data.image[0]):null

      if(file){
        await appwriteService.deleteFile(post.featuredImage)
      }
       
    const dbPost = await  appwriteService.updatePost(post.$id,{
      ...data,
      featuredImage: file? file.$id: undefined
    })

    if(dbPost){
      navigate(`/post/${dbPost.$id}`)
    }

    }else{
      const file = await appwriteService.uploadFile(data.image[0]);

      if(file){
        const fileId = file.$id
        data.featuredImage = fileId
       const dbPost = await appwriteService.createPost(
          {
            ...data,
            userId : userData.$id
          }
        )
        if(dbPost){
          navigate(`/post/${dbPost.$id}`)
        }
      }
    }
  }

  const slugTransform = useCallback((value)=>{
    if(value && typeof(value) === "string"){
      return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g,"-")
            .replace(/\s/g,"-")
    }
    return ""
  },[])

  useEffect(()=>{
    const subscribe = watch((value,{name})=>{
      if(name === "title"){
        setValue("slug",slugTransform(value.title),{
          shouldValidate:true
        })
      }
    })
  },[watch,slugTransform,setValue])
  return (
   function PostForm() {
  return (
    <form className="flex flex-wrap">
      
      {/* Left Side */}
      <div className="w-2/3 px-2">
       <Input 
       label ="Title"
       placeholder = "title"
       className="mb-4"
       {...register("title",{
        required:true
       })}
       />
       <Input 
       label="Slug"
       placeholder="Slug"
       className='mb-4'
       {...register("slug"),{
        required:true
       }}
       onInput={(e)=>{
        setValue("slug",slugTransform(e.currentTarget.value),{
          shouldValidate:true
        })
       }}
       />
       <RTE label="Content :" name="content" control={control}  defaultValue={getValues("content")}/>
      </div>

      {/* Right Side */}
      <div className="w-1/3 px-2">
      <Input 
      label = "Featured Image"
      type = "file"
      accept = "image/png, image/jpg, image/jpeg, image/gif"
      className="mb-4"
      {...register("image",{required:!post})}
     
      />
      {
        post && <div className="w-full mb-4">
          <img src={appwriteService.getFilePreview(post.featuredImage)}
           alt={post.title} 
           className="rounded-lg"
           />
        </div>
      }
      <Select 
      options = {["active","Inactive"]}
      label = "status"
      className="mb-4"
      {...register("status",{
        required:true
      })}
      />
      <Button
      type="submit"
      className="w-full"
      bgColor={post ? "bg-green-500":undefined}>
        {post ? "Update":"Submit"}
      </Button>
      </div>

    </form>
  )
}
  )
}

export default PostForm