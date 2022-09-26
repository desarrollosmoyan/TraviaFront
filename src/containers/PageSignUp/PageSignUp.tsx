import React, { ChangeEvent, FC, useEffect } from "react";
import googleSvg from "images/Google.svg";
import { Helmet } from "react-helmet";
import Input from "shared/Input/Input";
import ButtonPrimary from "shared/Button/ButtonPrimary";
import { Link } from "react-router-dom";
import {Country,State,City,IState, ICity} from "country-state-city"
import Select from "shared/Select/Select";
import { useState } from "react";


export interface PageSignUpProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Google",
    href: "#",
    icon: googleSvg,
  },
];

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [cities,setCities] = useState<string | null>(null)
  const states = State.getStatesOfCountry("MX")
 useEffect(() => {
  if(!cities) return;
  const pepe = City.getCitiesOfState("MX",cities as string)
  console.log(pepe)
 },[cities])
 console.log(cities)
  //const city = City.getCitiesOfState("MX",)
  return (
    <div className={`nc-PageSignUp  ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Registrarse - Travia</title>
      </Helmet>
      <div className="container mb-24 lg:mb-32">
        <h2 className="my-20 flex items-center text-3xl leading-[115%] md:text-5xl md:leading-[115%] font-semibold text-neutral-900 dark:text-neutral-100 justify-center">
          Registrarse
        </h2>
        <div className="max-w-md mx-auto space-y-6 ">
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
          <form className="grid grid-cols-1 gap-6" action="#" method="post">
          <div className="flex gap-4">
            <label>

              <span className="text-neutral-800 dark:text-neutral-200">
                Nombre
              </span>
              <Input
                type="text"
                placeholder="Charlie"
                className="mt-1"
              />
            </label>
            <label>
               <span className="text-neutral-800 dark:text-neutral-200">
                Apellido
              </span>
              <Input
                type="text"
                placeholder="Brown"
                className="mt-1"
              />
            </label>
            </div>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Correo electrónico
              </span>
              <Input
                type="email"
                placeholder="charliebrown@gmail.com"
                className="mt-1"
              />
            </label>
            <div className="flex gap-6">
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Estado
              </span>
              <Select onChange={(e) => setCities(e.currentTarget.value)} className="cursor-pointer mt-1">
                {
                  states.map((value:IState) => (
                    <option onClick={(e) => setCities(value.isoCode)}>{value.name}</option>
                  ))
                }
              </Select>
            </label>
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Ciudad
              </span>
              <Select className="cursor-pointer mt-1">
                {
                  cities ?
                  City.getCitiesOfState("MX",cities).map((value:ICity) => (
                    <option>{value.name}</option>
                  ))
                  : null
                }
              </Select>
            </label>
            </div>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Telefóno
              </span>
              <div className="flex gap-2 items-center justify-center">
                <div className="w-2/12">
                  <Input defaultValue="+52" readOnly  type="text" placeholder="+54" className="mt-1" />
                </div>
                <div className="w-full">
                  <Input type="text"/>
                </div>
              </div>
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Contraseña
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Confirmar Contraseña
              </span>
              <Input type="password" className="mt-1" />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form>

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Ya tienes una cuenta?{` `}
            <Link to="/login">Inicia sesión</Link>
          </span>
        </div>
      </div>
    </div>
  );
};

export default PageSignUp;
