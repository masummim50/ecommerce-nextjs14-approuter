"use client"

import { Card, CardBody, Tabs, Tab } from '@nextui-org/react';
import { useSearchParams } from 'next/navigation';
import React from 'react';
import SignUpForm from '../components/login/SignUpForm';
import SellerSignUpForm from '../components/login/SellerSignUpForm';

const SignUpPage = () => {
    const searchParams = useSearchParams()

  const tab = searchParams.get('tab');
    
  const [selected, setSelected] = React.useState<string | number>(tab ? tab : "user");
    return (
        <div className="flex w-full items-center justify-center text-white mt-3">
      <div className="flex flex-col w-full items-center justify-center">
        <Card className="max-w-full w-[340px] h-[450px]">
          <CardBody className="overflow-hidden">
            <Tabs
              fullWidth
              size="md"
              aria-label="Tabs form"
              selectedKey={selected}
              onSelectionChange={setSelected}
            >
              <Tab key="user" title="Sign Up">
                <SignUpForm/>
              </Tab>
              <Tab key="seller" title="Seller Sign up">
                <SellerSignUpForm/>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>
      </div>
    </div>
    );
};

export default SignUpPage;