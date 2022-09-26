import React, { FC, useEffect } from "react";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import { Link, useHistory } from "react-router-dom";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import useAxios, { METHODS } from "hooks/useAxios";
import { useState } from "react";
import {useForm} from "react-hook-form"
import {Id, toast, ToastContainer} from "react-toastify"
import { API_ENDPOINTS } from "../../constants";
import { useCookie } from "react-use";

export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const {register,handleSubmit,formState:{errors}} = useForm()
  const [toastId,setToastId] = useState<Id>();
  const history = useHistory()
  const url = API_ENDPOINTS.auth.login
  const {responseData,isLoading,error,dispatchBody,shootRequest} = useAxios({url:url,method:METHODS.POST,initialData:{},body:null,isLazy:true})
  const [token,updateToken] = useCookie("token")
  const [refreshToken,updateRefreshToken] = useCookie("refreshToken")

  useEffect(() => {
    if(token){
      history.push("/")
    }
    if(isLoading || !toastId) return;
    if(error){
      toast.update(toastId,{render:"Email o contraseña incorrectos",isLoading:isLoading,delay:500,type:"error",position:"bottom-center"})
      return;
    }
    toast.update(toastId,{render:"Sesión iniciada con éxito",isLoading:isLoading,delay:500,type:"success"})
  },[isLoading])
  useEffect(() => {
    if(Object.keys(responseData).length === 0)return;
    updateToken(responseData.access_token)
    updateRefreshToken(responseData.refresh_token)
    history.push("/")
  },[responseData])
  const onButtonSubmit = (dataToSubmit:any) => {
    const id = toast("Iniciando sesión",{isLoading:isLoading,autoClose:500})
    setToastId(id)
    dispatchBody(dataToSubmit)
    shootRequest();
  }
  console.log(responseData)
 
  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Iniciar Sesión - Travia</title>
      </Helmet>
      <ToastContainer theme="dark"/>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Iniciar Sesión
        </h2>
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              O
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <form className="grid grid-cols-1 gap-6" action="#" method="post" onSubmit={handleSubmit(onButtonSubmit)}>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Correo electrónico 
              </span>
              <Input
                type="email"
                placeholder="example@example.com"
                className="mt-1"
                {...register("email",{required:true})}
              />
              { 
              errors.email && <span className="text-red-500 text-xs italic">Correo electrónico requerido</span>
              }
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Contraseña
                <Link to="/forgot-pass" className="text-sm">
                  Olvidaste tu contraseña?
                </Link>
              </span>
              <Input type="password" {...register("password",{required:true})} className="mt-1" />
              { 
              errors.password && <span className="text-red-500 text-xs italic">Contraseña requerida</span>
              }
            </label>
            <ButtonPrimary disabled={!isLoading && Object.keys(responseData).length > 0 ? true : false} type="submit">Iniciar sesión</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Eres nuevo?{` `}
            <Link to="/signup">Crea una cuenta</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageLogin;
