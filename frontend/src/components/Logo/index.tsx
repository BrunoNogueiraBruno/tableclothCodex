import SVGLogo from '../../assets/logo.svg?react';

type LogoProps = {
  showTitle?: boolean;
  size?: number | string;
  titleSize?: number | string;
  dir?: "column" | "column-reverse" | "row" | "row-reverse"
};

function Logo({ showTitle = false, size = "100px", titleSize = "2.3em", dir = "column" }: LogoProps) {
  return (
    <div style={{flexDirection: dir}} className="flex w-full items-center text-center gap-2">
      {showTitle && (
        <h1  style={{ fontSize: titleSize }} className={`font-semibold text-gray-900 text-left`}>
            <div>Tablecloth</div><div>Index</div>
        </h1>
      )}
      <SVGLogo style={{height: size}} className={`w-auto text-gray-900`} />
    </div>
  );
}

export default Logo;
