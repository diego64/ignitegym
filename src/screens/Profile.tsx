import { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { Center, ScrollView, VStack, Skeleton, Text, Heading } from 'native-base';
import * as ImagePicker from 'expo-image-picker';

import { ScreenHeader } from '@components/ScreenHeader';
import { UserPhoto } from '@components/UserPhoto';
import { Input } from '@components/Input';
import { Button } from '@components/Button';

const PHOTO_SIZE = 33;

export function Profile() {
  const [photoIsLoading, setPhotoIsLoading] = useState(false);
  const [userPhoto, setUserPhoto] = useState('https://github.com/diego64.png');

  async function handleUserPhotoSelected(){
    setPhotoIsLoading(true);

    try {
      const photoSelected = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        quality: 1,
        aspect: [4, 4],
        allowsEditing: true,
      });

      if(photoSelected.assets[0].uri) {
        setUserPhoto(photoSelected.assets[0].uri);
      }

    } catch (error) {
      console.log(error)
    } finally {
      setPhotoIsLoading(false)
  }

  return (
    <VStack flex={1}>
      <ScreenHeader title='Perfil' />
        <ScrollView contentContainerStyle={{ paddingBottom: 36 }}>
          <Center mt={6} px={10}>
            {
                photoIsLoading ? 
                <Skeleton
                w={PHOTO_SIZE}
                h={PHOTO_SIZE}
                rounded='full'
                startColor="gray.500"
                endColor="gray.400"
              />
              : 
              <UserPhoto 
                source={{ uri: userPhoto }}
                alt='Foto do usuário'
                size={33}
              />
            }

            <TouchableOpacity onPress={handleUserPhotoSelected}>
              <Text color="green.500" fontWeight="bold" fontSize="md" mt={2} mb={8}>
                Alterar foto
              </Text>
            </TouchableOpacity>

            <Input 
              bg="gray.600" 
              placeholder='Nome' 
            />

            <Input 
               bg="gray.500" 
              placeholder="E-mail"
              value=''
              isDisabled
            />
          
            <Heading color="gray.200" fontSize="md" mb={2} alignSelf="flex-start" mt={16}>
              Alterar senha
            </Heading>

            <Input 
              bg="gray.600"
              placeholder="Senha antiga"
              secureTextEntry
            />

            <Input 
              bg="gray.600"
              placeholder="Nova senha"
              secureTextEntry
            />

            <Input 
              bg="gray.600"
              placeholder="Confirme a nova senha"
              secureTextEntry
            />

          <Button title="Atualizar" mt={4} />
          </Center>
        </ScrollView>
    </VStack>
  )
}