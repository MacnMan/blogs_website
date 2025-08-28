
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
  const shiftClass = idx % 2 === 0 ? "sm:-mt-10" : "sm:mt-40";
  const lineHeights = ["h-[197%]", "h-[60%]", "h-[185%]", "h-[66%]"];
const lineHeight = lineHeights[idx % 4];


  return (
    <div className={`flex flex-col items-center relative ${shiftClass}`}>
      <div className="flex flex-row items-start gap-4 relative">
        {/* Icon + Number */}
        <div className="flex flex-col items-center flex-shrink-0 relative">
          {feature.icon?.asset?.url && (
            <Image
              src={feature.icon.asset.url}
              alt={feature.icon.alt || feature.title}
              width={100}
              height={80}
              className="object-contain mb-2"
            />
          )}
          <div className="px-8 py-1 bg-gray-200 text-gray-700 font-semibold text-sm rounded-b-full border border-gray-300 relative z-20">
            {idx + 1}
          </div>
          {/* Vertical Line */}
          <div
            className={`absolute top-full left-1/2 -translate-x-1/2 w-[.8px] bg-gray-300 ${lineHeight} z-[-10]`}
          />

        </div>

        {/* Title + Description */}
        <div className="text-left">
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
        className="sm:w-full sm:h-[625px] rounded-2xl object-contain border relative z-50"
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
        <div className="relative sm:max-w-6xl mx-auto px-6 sm:px-12 z-[-10]">
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
