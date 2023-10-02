export const useZoomImg = () => {
  const magnification = 0.9;
  const mainImageRef = ref<null>();
  const viewImageRef = ref<any>();

  const handleMouseMove = (event: any) => {
    const mainImage = mainImageRef.value as any;

    const rect = mainImage.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const backgroundPosition = `-${x * magnification}px -${y * magnification}px`;

    viewImageRef.value.style.backgroundImage = `url(${mainImage.src})`;
    viewImageRef.value.style.backgroundPosition = backgroundPosition;
  };

  return {
    handleMouseMove,
    mainImageRef,
    viewImageRef,
  };
};
