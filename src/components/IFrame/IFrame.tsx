interface IFrameProps {
    src: string;
    width?: string;
    height?: string;
  }
  
  const IFrame: React.FC<IFrameProps> = ({ src, width, height }) => {
    return (
      <div>
        <iframe
          width={width}
          height={height}
          src={src}
          allowFullScreen
          frameBorder={0}
          title="DefiLlama"
        />
      </div>
    );
  };
  
  export default IFrame;
  