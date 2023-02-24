import React from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { AxiosError } from 'axios';

import PageWrapper from '@/components/PageWrapper';
import Avatar from '@/components/Avatar';
import Modal from '@/components/Modal';
import TextField from '@/components/TextField';
import TextArea from '@/components/TextArea';
import { Button, PrimaryButton } from '@/components/Button';
import { fetcher, fetcherMutation, ApiResponse } from '@/common/lib/fetcher';
import { getToken, removeToken } from '@/common/lib/auth';
import { ImageDto, ProfileDto } from '@/common/api/types';
import { ENDPOINTS } from '@/common/api/endpoints';
import { useModal } from '@/common/hooks/useModal';
import styles from '@/styles/Profile.module.css';

export default function Profile() {
  const { isOpen, openModal, closeModal } = useModal();

  const router = useRouter();

  const {
    data: profile,
    isLoading,
    error: getProfileErrors,
  } = useSWR<ApiResponse<ProfileDto>>(
    () => (Boolean(getToken()) ? ENDPOINTS.PROFILE.GET : null),
    (url: string) => fetcher(url, { headers: { 'X-API-KEY': getToken() } }),
  );

  const { trigger: uploadImage } = useSWRMutation<ApiResponse<ImageDto>>(
    ENDPOINTS.IMAGE.CREATE,
    fetcherMutation,
  );

  const { trigger: updateProfile, error: updateProfileErrors } = useSWRMutation<
    ApiResponse<ProfileDto>
  >(ENDPOINTS.PROFILE.UPDATE, fetcherMutation);

  const updateProfileInfo = async (data: any) => {
    await updateProfile({
      method: 'PATCH',
      data: {
        imageId: data.imageId,
        coverId: data.coverId,
        slug: data.slug,
        name: data.name,
        description: data.description,
      },
      headers: {
        'X-API-KEY': getToken(),
      },
    });
  };

  const onRemoveCover = () => {
    updateProfileInfo({ ...profile?.data, coverId: null });
  };

  const onUpdateImage = async (
    event: React.ChangeEvent<HTMLInputElement>,
    type: 'image' | 'cover',
  ) => {
    if (event.target.files) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);

      const newImage: any = await uploadImage({
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      await updateProfileInfo({
        ...profile?.data,
        [`${type}Id`]: newImage.data.id,
      });
    }

    event.target.value = '';
  };

  const logout = () => {
    removeToken();
    router.push('/login');
  };

  return (
    <PageWrapper title={profile?.data.name ?? ''}>
      <div className={styles.container}>
        {isLoading || !profile ? (
          <h1>Loading...</h1>
        ) : getProfileErrors ? (
          <h1>Что-то пошло не так - {getProfileErrors.message}</h1>
        ) : (
          <>
            <ProfileEditModal
              isVisible={isOpen}
              onCloseModal={closeModal}
              profile={profile.data}
              updateProfileInfo={updateProfileInfo}
              errors={updateProfileErrors}
            />
            <ProfileCover
              cover={profile.data.cover}
              onUpdateCover={(event: React.ChangeEvent<HTMLInputElement>) =>
                onUpdateImage(event, 'cover')
              }
              onRemoveCover={onRemoveCover}
            />
            <div className={styles.content}>
              <ProfileAvatar
                name={profile.data.name}
                image={profile.data.image}
                onUpdateImage={(event: React.ChangeEvent<HTMLInputElement>) =>
                  onUpdateImage(event, 'image')
                }
              />
              <ProfileInfo
                name={profile.data.name}
                email={profile.data.email}
                description={profile.data.description}
                openEditModal={openModal}
              />
              <Button
                text={'Выйти'}
                iconLeft={'/svg/logout.svg'}
                onClick={logout}
                className={styles.logoutButton}
              />
            </div>
          </>
        )}
      </div>
    </PageWrapper>
  );
}

const ProfileEditModal = ({
  isVisible,
  onCloseModal,
  profile,
  updateProfileInfo,
  errors,
}: {
  isVisible: boolean;
  onCloseModal: () => void;
  profile: ProfileDto;
  updateProfileInfo: (data: any) => Promise<void>;
  errors: AxiosError;
}) => {
  const [name, setName] = React.useState(profile.name);
  const [slug, setSlug] = React.useState(profile.slug);
  const [description, setDescription] = React.useState(
    profile.description ?? '',
  );

  const onUpdateProfileInfo = async () => {
    await updateProfileInfo({
      ...profile,
      slug,
      name,
      description,
    });

    onCloseModal();
  };

  return (
    <Modal
      isVisible={isVisible}
      onClose={onCloseModal}
      title={'Редактировать профиль'}
      className={styles.modalContent}
    >
      <div className={styles.modalInputs}>
        <div>
          <p className={styles.modalInputLabel}>Имя</p>
          <TextField placeholder={'Имя'} value={name} setValue={setName} />
          {errors && errors.message.includes('name') && (
            <p className={styles.validationErrorMessage}>{errors.message}</p>
          )}
        </div>
        <div>
          <p className={styles.modalInputLabel}>Адрес профиля</p>
          <div className={styles.profileAddressInputContent}>
            <div className={styles.profileAddressInputBox}>example.com/</div>
            <div className={styles.profileeAddressInput}>
              <TextField
                placeholder={'Адрес профиля'}
                value={slug}
                setValue={setSlug}
              />
            </div>
          </div>
          {errors && errors.message.includes('slug') && (
            <p className={styles.validationErrorMessage}>{errors.message}</p>
          )}
        </div>
        <div>
          <p className={styles.modalInputLabel}>Описание</p>
          <TextArea
            placeholder={'Описание'}
            value={description}
            setValue={setDescription}
          />
        </div>
      </div>
      <div className={styles.modalFooter}>
        <Button
          text={'Отмена'}
          onClick={onCloseModal}
          className={styles.modalFooterButton}
        />
        <PrimaryButton
          text={'Сохранить'}
          onClick={onUpdateProfileInfo}
          className={styles.modalFooterButton}
        />
      </div>
    </Modal>
  );
};

const ProfileCover = ({
  cover,
  onUpdateCover,
  onRemoveCover,
}: {
  cover?: ImageDto;
  onUpdateCover: (event: any) => void;
  onRemoveCover: () => void;
}) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  return (
    <div className={styles.profileCover}>
      {cover ? (
        <Image
          className={styles.profileCover}
          src={cover.url}
          width={0}
          height={0}
          alt={''}
        />
      ) : (
        <div className={styles.profileCover} />
      )}
      <Button
        text={cover ? 'Удалить' : 'Загрузить'}
        iconLeft={cover ? '/svg/trash.svg' : '/svg/upload.svg'}
        iconRight={'/svg/image.svg'}
        onClick={cover ? onRemoveCover : () => hiddenFileInput.current?.click()}
        className={styles.updateCoverButton}
      />
      <input
        ref={hiddenFileInput}
        type="file"
        onChange={cover ? () => null : onUpdateCover}
        hidden={true}
      />
    </div>
  );
};

const ProfileAvatar = ({
  name,
  image,
  onUpdateImage,
}: {
  name: string;
  image?: ImageDto;
  onUpdateImage: (event: any) => void;
}) => {
  const hiddenFileInput = React.useRef<HTMLInputElement>(null);

  return (
    <>
      <Avatar name={name} image={image} className={styles.avatar} />
      <div
        className={styles.camera}
        onClick={() => hiddenFileInput.current?.click()}
      >
        <Image src={'/svg/camera.svg'} width={50} height={50} alt={'camera'} />
        <input
          ref={hiddenFileInput}
          type="file"
          onChange={onUpdateImage}
          hidden={true}
        />
      </div>
    </>
  );
};

const ProfileInfo = ({
  name,
  email,
  description,
  openEditModal,
}: {
  name: string;
  email: string;
  description?: string;
  openEditModal: () => void;
}) => {
  return (
    <>
      <div className={styles.profileHeader}>
        <div className={styles.profileNameEmail}>
          <h1 className={styles.profileName}>{name}</h1>
          <p className={styles.profileEmail}>{email}</p>
        </div>
        <Button
          text={'Редактировать'}
          iconLeft={'/svg/edit.svg'}
          onClick={openEditModal}
          className={styles.editButton}
        />
      </div>
      {description && <p className={styles.description}>{description}</p>}
    </>
  );
};
