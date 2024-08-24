"use client";
import React from "react";

interface propsType {
  params: {
    id: number;
  };
}

function page(props: propsType) {
  return <div>{props.params.id}</div>;
}

export default page;
