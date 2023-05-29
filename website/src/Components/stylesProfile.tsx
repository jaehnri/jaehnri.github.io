import CSS from 'csstype';

var backgroundImagePath = "url(https://www.kindpng.com/imgv/JwRwwx_transparent-morning-sunrise-clipart-dusk-vector-hd-png)"

const normalText: CSS.Properties = {
  color: "#51425f",
  fontSize: "18px",
  paddingLeft:"30%",
  paddingRight: "30%"
};

const titleText: CSS.Properties = {
  color:"#2e1437",
  fontSize: "30px"
};

const background: CSS.Properties = {
  backgroundColor: "#f8ecd4",
  backgroundImage: backgroundImagePath,
  backgroundRepeat: "no-repeat",
  position: "absolute",
  width: "100%",
  height: "100%",
  paddingTop: "2%"

}

const profilePic: CSS.Properties = {
  borderRadius: "100%"
}

const backgroundPic: CSS.Properties = {
  backgroundImage: backgroundImagePath,
  position: "absolute",
  width: "auto",
  zIndex: -1
}

export function textoNormal() : CSS.Properties {
  return(
      normalText
  )
}

export function textoTitulo() : CSS.Properties {
  return(
      titleText
  )
}

export function fundo() : CSS.Properties {
  return(
      background
  )
}

export function imageProfile() : CSS.Properties {
  return(
    profilePic
  )
}

export function imageBackground() : CSS.Properties {
  return(
    backgroundPic
  )
}