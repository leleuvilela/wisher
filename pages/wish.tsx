// import Head from 'next/head'

import { Heading, Grid, Flex, Link, Button, Text, Image, Icon, Spinner, Alert, AlertIcon } from '@chakra-ui/core'
import { FormEvent, useState } from 'react';
import Divider from '../components/Divider'
import Input from '../components/Input'
import axios from 'axios'
import Textarea from '../components/Textarea';

export default function Home() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [instagram, setInstagram] = useState('');
  const [message, setMessage] = useState('');

  const [loading, setLoading] = useState(false)

  const [erro, setErro] = useState('')

  async function handleSignUpToNewsletter(event: FormEvent) {
    event.preventDefault();
    if(!name || !message){
      setErro('Ops, parece que você esqueceu de preencher algo')
      return
    }
    setLoading(true)
    await axios.post('/api/wishes', { name, instagram, message, email });
    window.location.replace('/')
  }

  return (
    <Flex
      as="main"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      <Flex
        as="form"
        onSubmit={handleSignUpToNewsletter}
        backgroundColor="gray.700"
        borderRadius="md"
        flexDir="column"
        alignItems="stretch"
        padding={8}
        marginTop={4}
        width="100%" 
        maxW="600px"
      >
        <Text textAlign="center" fontSize="2xl" color="gray.50" marginBottom={5} fontWeight="bold">
          <Icon name="star" size="22px" /> whisher
        </Text>

        <Text textAlign="center" fontSize="sm" color="gray.400" marginBottom={2}>
          Faça um desejo, ele pode se realizar!
        </Text>

        {!!erro && <Alert status="error">
          <AlertIcon />
          {erro}
        </Alert>}
  
        <Input
          placeholder="Seu nome"
          marginTop={2}
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Input
          placeholder="Instagram"
          marginTop={2}
          value={instagram}
          onChange={e => setInstagram(e.target.value)}
        />

        <Textarea
          placeholder="Descreva aqui o seu desejo para alguém (provavelmente rico) realizar. Deixe informações como seu picpay, valor, etc."
          marginTop={2}
          size="lg"
          minH="120px"
          value={message}
          onChange={e => setMessage(e.target.value)}
        />

        <Input
          placeholder="Paypal"
          marginTop={2}
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <Text fontSize="sm" color="gray.500" marginBottom={2} px={2}>
          Isso aumenta as chances de conseguir realizar! Crie uma conta no <Link color="purple.500" href="https://www.paypal.com/br/welcome/signup/#/mobile_conf">PayPal</Link> e coloque o email cadastrado aqui para receber doações. Verifique se o email está correto, isso é muito importante.
        </Text>
  
        <Button
          type="submit"
          backgroundColor="purple.500"
          height="50px"
          borderRadius="sm"
          marginTop={6}
          _hover={{ backgroundColor: 'purple.600' }}
          isDisabled={loading}
        >
          {!loading ? 'DESEJAR' : <Spinner />}
        </Button>
      </Flex>
    </Flex>
  )
}
