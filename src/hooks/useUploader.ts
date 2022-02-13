import {useState, ChangeEvent, useEffect} from 'react';
import {CatchError} from '../types/utils';
import {propertyStorage} from '../storage/properties';
import {lang} from '../content';
import {systemActions} from '../state/actions/system';

export const useUploader = () => {
  const [inputElement, setInputElement] = useState<HTMLInputElement | null>(null);
  const [imgPreview, setImgPreview] = useState<string>('');
  const [imgFile, setImgFile] = useState<File | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e: Event) => onFileChange(e as any);
    setInputElement(input);
  }, []);

  const uploadImg = async (onDone: (imgUrl: string, imgName: string) => Promise<void>) => {
    try {
      if (imgFile) {
        setIsLoading(true);
        const {imgUrl, imgName} = await propertyStorage.uploadImg(imgFile);
        await onDone(imgUrl, imgName);
        reset();
      }
    } catch (err: CatchError) {
      const message = lang('GLOBAL.ERROR.UPLOAD_IMAGE');
      systemActions.setTopNotification(message);
    } finally {
      setIsLoading(false);
    }
  };

  const openImgPicker = () => {
    if (inputElement) {
      inputElement.click();
    }
  };

  const onFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const {target: {files}} = event;
    const reader = new FileReader();
    if (files && files[0]) {
      reader.onload = () => setImgPreview(reader.result as string);
      reader.readAsDataURL(files[0]);
      setImgFile(files[0]);
    }
  };

  const reset = () => {
    setImgPreview('');
    setImgFile(null);
    if (inputElement) {
      inputElement.value = '';
    }
  };

  return {imgPreview, openImgPicker, uploadImg, isLoading, reset};
};
