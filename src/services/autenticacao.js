import {
  GoogleSignin,
  statusCodes,
} from "@react-native-google-signin/google-signin";

import {
  GoogleAuthProvider,
  signInWithCredential,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth } from "../../firebaseConfig";

const DOMINIO_PERMITIDO = "iftm.edu.br";

function emailPermitido(email) {
  if (!email) {
    return false;
  }

  const partes = email
    .toLowerCase()
    .trim()
    .split("@");

  return (
    partes.length === 2 &&
    partes[1] === DOMINIO_PERMITIDO
  );
}

export function configurarGoogleSignin() {
  GoogleSignin.configure({
    webClientId: process.env.EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID,
  });
}

export function observarUsuario(callback) {
  return onAuthStateChanged(auth, async (usuario) => {
    if (usuario) {
      if (!emailPermitido(usuario.email)) {
        await signOut(auth);

        try {
          await GoogleSignin.signOut();
        } catch (erro) {}

        callback(null);
        return;
      }

      callback(usuario);
      return;
    }

    callback(null);
  });
}

export async function entrarComGoogle() {
  await GoogleSignin.hasPlayServices({
    showPlayServicesUpdateDialog: true,
  });

  const resposta = await GoogleSignin.signIn();

  if (resposta.type === "cancelled") {
    return {
      cancelado: true,
    };
  }

  const email = resposta.data?.user?.email;

  if (!emailPermitido(email)) {
    try {
      await GoogleSignin.signOut();
    } catch (erro) {}

    const erroDominio = new Error(
      "O acesso é permitido apenas para usuários do domínio iftm.edu.br."
    );

    erroDominio.code = "auth/dominio-nao-permitido";

    throw erroDominio;
  }

  const idToken = resposta.data?.idToken;

  if (!idToken) {
    throw new Error(
      "O Google não devolveu o idToken. Verifique o webClientId informado em configurarGoogleSignin()."
    );
  }

  const credencial = GoogleAuthProvider.credential(idToken);

  await signInWithCredential(
    auth,
    credencial
  );

  return {
    cancelado: false,
  };
}

export async function sair() {
  try {
    await GoogleSignin.signOut();
  } catch (erro) {}

  await signOut(auth);
}

export function descreverErro(erro) {
  switch (erro?.code) {
    case statusCodes.IN_PROGRESS:
      return "Já existe um login em andamento. Aguarde.";

    case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
      return "Este dispositivo não possui o Google Play Services atualizado.";

    case statusCodes.SIGN_IN_CANCELLED:
      return null;

    case "auth/dominio-nao-permitido":
      return "Acesso restrito. Utilize uma conta Google do domínio iftm.edu.br.";

    default:
      return "Não foi possível entrar com o Google. Tente novamente.";
  }
}