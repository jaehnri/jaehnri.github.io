import React from 'react'
import { Image, Button } from 'antd'
import { GithubOutlined, LinkedinOutlined } from '@ant-design/icons';
import { Typography } from 'antd'
import {textoNormal, textoTitulo, fundo, imageProfile, imageBackground} from './stylesProfile.tsx'

function Profile() {
    var name = "João Henri Carrenho Rocha"
    var description = " Essa é uma descrição do que ele faz e o que ele quer fazer e eu estou apenas simulando pq precisa ser um texto levemente maior por que sim"
    var graduação = "Ciência da Computação - USP"
    var status = "cursando  - 7º Semestre"
    var imagePath = "https://avatars.githubusercontent.com/u/30930799?v=4"
    var LinkedinButton = "\n Linkedin"
    const { Title } = Typography;
    return (
      <div style={fundo()}>
      <Image src={imagePath} style={imageProfile()} width={200} />
      <Title level={3} style={textoTitulo()}>{name}</Title>
      <Title level={5} style={textoNormal()}>{description}</Title>
      <Title level={4} style={textoTitulo()}>Graduação</Title>
      <Title level={5} style={textoNormal()}>{graduação}</Title>
      <Title level={5} style={textoNormal()}>{status}</Title>
      <Title level={4} style={textoTitulo()}>Portifólio</Title>
      curriculo + github
      <Title level={4} style={textoTitulo()}>Contato</Title>
      <Button type="text" shape="circle" icon={<GithubOutlined/>} size={'large'}> Github</Button>
      <Button type="text" shape="circle" icon={<LinkedinOutlined/>} size={'large'}> {LinkedinButton}</Button>
      </div>
    );
  }

  export default Profile;