import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Header, Dropdown, Image, Icon } from 'semantic-ui-react';

interface LoginProps {
  authClient: AuthClient;
}

export default function Login({ authClient }: LoginProps) {
  if (!authClient.userDecodedToken) {
    return (
      <Button
        icon
        color="google plus"
        labelPosition="left"
        onClick={() => authClient.login()}
      >
        <Icon name="google" />
        Login with Google
      </Button>
    );
  }

  const trigger = (
    <Header as="h3" floated="right">
      <Image circular tiny src={authClient.userDecodedToken.picture} />
    </Header>
  );
  const options = [
    { key: 'user', text: 'Account', icon: 'user', as: Link, to: '/account' },
    {
      key: 'sign-out',
      text: 'Sign Out',
      icon: 'sign out',
      onClick: () => authClient.logout(),
    },
  ];

  return (
    <Dropdown
      trigger={trigger}
      options={options}
      direction="left"
      icon={null}
    />
  );
}
