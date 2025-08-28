
import Image from "next/image";

// 1. Deployment Title + Description
const DeploymentTitle = ({ title, description }: { title: string; description: string }) => (
  <>
    <h2 className="text-2xl text-gray-800 font-semibold text-center mb-4">{title}</h2>
    <div className="sm:mx-64 text-center text-gray-400 mb-20 space-y-2">{description}</div>
  </>
);

// 2. Single Deployment Feature
const DeploymentFeature = ({ feature, idx }: { feature: any; idx: number }) => {
  // Vertical shift as before
  const shiftClass = idx % 2 === 0 ? "sm:-mt-10" : "sm:mt-40";
  const lineHeights = ["h-[167%]", "h-[38%]", "h-[157%]", "h-[43%]"];
  const lineHeight = lineHeights[idx % 4];

  // Horizontal shift
  const horizontalShift = idx % 2 === 0 ? "sm:ml-40" : "sm:mr-30";

  return (
    <div className={`flex flex-col items-center relative ${shiftClass} ${horizontalShift}`}>
      <div className="flex flex-row items-start gap-4 relative">
        {/* Icon + Number */}
        <div className="flex flex-col items-center flex-shrink-0 relative">
          {feature.icon?.asset?.url && (
            <Image
              src={feature.icon.asset.url}
              alt={feature.icon.alt || feature.title}
              width={110}
              height={80}
              className="object-contain mb-[-30px]"
            />
          )}

          <div className="flex justify-center w-full relative h-16">
            {/* Trapezoid area for number */}
            <div
              className="px-20 py-1 text-gray-700 font-semibold text-xl text-center relative z-10 top-11"
              style={{
                clipPath: "polygon(0% 0%, 100% 0%, 75% 100%, 25% 100%)"
              }}
            >
              <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mx-auto text-white/95">
                {idx + 1}
              </div>
            </div>

            {/* Left angled border */}
            <div
              className="absolute bg-gray-400"
              style={{
                width: ".8px",
                height: "35%",
                top: 48,
                left: "21.7%",
                transform: "rotate(-45deg)",
                transformOrigin: "top left"
              }}
            ></div>

            {/* Right angled border */}
            <div
              className="absolute bg-gray-400"
              style={{
                width: ".8px",
                height: "35%",
                top: 48,
                right: "21.7%",
                transform: "rotate(45deg)",
                transformOrigin: "top right"
              }}
            ></div>

            {/* Bottom border */}
            <div
              className="absolute bg-gray-400"
              style={{
                height: ".8px",
                bottom: 0,
                left: "30%",
                right: "30%"
              }}
            ></div>
          </div>

          {/* Vertical Line */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 w-[.8px] bg-gray-400 ${lineHeight} z-[-10]`}
          />
        </div>

        {/* Title + Description */}
        <div className="text-left ml-[-50px] w-64">
          <h3 className="font-semibold text-gray-800 text-[14px]">{feature.title}</h3>
          <div className="text-gray-500 mt-2 space-y-1 text-[10px]">
            {feature.description
              .split(". ")
              .filter(Boolean)
              .map((sentence: string, i: number) => (
                <p key={i}>
                  {sentence.trim()}
                  {sentence.endsWith(".") ? "" : "."}
                </p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};


// 3. Deployment Image
const DeploymentImage = ({ diagram }: { diagram: any }) => {
  if (!diagram?.asset?.url) return null;

  return (
    <div id="deployment-image" className="relative sm:mt-16 mt-10 z-40">
      <Image
        src={diagram.asset.url}
        alt={diagram.alt || "Deployment"}
        width={1900}
        height={500}
        className="sm:w-full sm:h-[625px] rounded-2xl object-contain border border-gray-400 relative"
      />
    </div>
  );
};

// 4. Deployment Section
const DeploymentSection = ({ data }: { data: any }) => {
  if (!data.deploymentTitle) return null;

  return (
    <section id="deployment" className="scroll-mt-24 mt-10">
      <DeploymentTitle title={data.deploymentTitle} description={data.deploymentDescription} />

      {data.deploymentFeatures?.length > 0 && (
        <div className="relative sm:max-w-8xl mx-auto px-6 sm:px-12 z-[-10]">
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative z-30">
            {data.deploymentFeatures.map((feature: any, idx: number) => (
              <DeploymentFeature key={idx} feature={feature} idx={idx} />
            ))}
          </div>

          {/* Main Image */}
          <DeploymentImage diagram={data.deploymentDiagram} />
        </div>
      )}
    </section>
  );
};

export default DeploymentSection;
