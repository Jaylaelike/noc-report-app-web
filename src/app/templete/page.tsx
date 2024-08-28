"use client";
import React from "react";
import { EmailTemplates } from "../../components/EmailTemplete";
import { useState, useEffect } from "react";

function page() {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [isClient, setIsClient] = useState(false);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    setIsClient(true);
  }, []);
  return (
    <div>
      {isClient && (
        <EmailTemplates
          userFirstName="John"
          loginDate={new Date()}
          loginDevice="iPhone"
          loginLocation="San Francisco"
          loginIp="14325252"
        />
      )}
    </div>
  );
}

export default page;
