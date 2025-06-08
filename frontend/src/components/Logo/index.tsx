import SVGLogo from '../../assets/logo.svg?react';

type LogoProps = {
  showTitle?: boolean;
};

function Logo({ showTitle = false }: LogoProps) {
  return (
    <div className="flex w-full flex-col items-center text-center">
      {showTitle && (
        <h1 className="font-semibold text-gray-900 text-left">
            <div>Tablecloth</div><div>Index</div>
        </h1>
      )}
      <SVGLogo className="h-25 w-auto text-gray-900" />
    </div>
  );
}

export default Logo;
