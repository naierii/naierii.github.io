import {
  GraphicFragment,
  useCreateGraphicMutation,
  useUploadMultipleFilesMutation,
} from '@graphql/generated/graphql';
import { graphQLClient } from '@graphql/graphql-client';
import { Dispatch, SetStateAction, useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';

import styles from './NavImages.module.scss';

export interface NavImagesUploadProps {
  setGraphic: (graphic: GraphicFragment) => void;
}

export const NavImagesUpload = ({ setGraphic }: NavImagesUploadProps) => {
  const [saving, setSaving] = useState(false);

  const { mutate: createGraphicMutation } = useCreateGraphicMutation(graphQLClient, {
    onSuccess(data) {
      const graphic = data.createGraphic?.data;
      setSaving(false);
      if (graphic) setGraphic(graphic);
    },
  });

  const { mutate: fileUploadMutate } = useUploadMultipleFilesMutation(graphQLClient, {
    onSuccess(data) {
      const fileIDs = data.multipleUpload.map((f) => f?.data?.id) as string[];
      createGraphicMutation({ data: { image: fileIDs[0], customer: true, name: fileIDs[0] } });
    },
  });

  const onDrop = useCallback((acceptedFiles: File[]) => {
    setSaving(true);
    fileUploadMutate({ files: acceptedFiles });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': [],
      'image/png': [],
    },
    maxFiles: 1,
    multiple: false,
  });

  return (
    <>
      <h5>Upload an image</h5>
      <div className={styles.dropZone} {...getRootProps()}>
        <input {...getInputProps()} />
        <div>
          <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 23.219 29.191'>
            <g>
              <path d='M11.609 0 10.12 1.489 0 11.609 2.978 14.6l8.631-8.631 8.632 8.631 2.978-2.991L13.1 1.489Z' />
              <path d='M14.356 29.191h-5v-26h5Z' />
            </g>
          </svg>
          {saving ? (
            <h5>Please wait...</h5>
          ) : isDragActive ? (
            <h5>Drop images here ...</h5>
          ) : (
            <h5>Click or drag images here to upload</h5>
          )}
        </div>
      </div>
    </>
  );
};
