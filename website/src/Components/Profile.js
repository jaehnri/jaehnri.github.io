import React from 'react'
import { Image } from 'antd'

import { Typography } from 'antd';
function Profile() {
    var name = "João Henri Carrenho Rocha"
    var description = " Essa é uma descrição do que ele faz e o que ele quer fazer e eu estou apenas simulando pq precisa ser um texto levemente maior por que sim"
    var graduação = "Ciência da Computação - USP"
    var status = "cursando  - 7º Semestre"
    const { Title } = Typography;
    return (
      <div>
      <Image src='../images/foto.png'/>
       <Title level={3}>{name}</Title>
       <Title level={5}>{description}</Title>
       <Title level={4}>Graduação</Title>
       <Title level={5}>{graduação}</Title>
       <Title level={5}>{status}</Title>
       <Title level={4}>Portifólio</Title>
       curriculo + github
       <Title level={4}>Contato</Title>
       email linkedin facebook 
      </div>
    );
  }

  export default Profile;