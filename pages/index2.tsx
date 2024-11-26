import client from "../contentful";
import { useRouter } from "next/router";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";

interface Props {
  maintenance: boolean;
}

export default function Home({ maintenance }: Props) {
  const [t, i18n] = useTranslation<string>("global"); //Traducción
  const dispatch = useDispatch(); //Redux Hook
  const route = useRouter(); //Enrutamiento

  //Estados de PopUps o secciones con posición absoluta
  const [register, setRegister] = useState<boolean>(false);
  const [open, setOpen] = useState("");
}

export async function getServerSideProps() {
  const maintenance = await client.getEntries({
    content_type: "maintenance",
  });

  return {
    props: {
      maintenance: maintenance.items.map(({ fields }) => fields)[0],
    },
  };
}
