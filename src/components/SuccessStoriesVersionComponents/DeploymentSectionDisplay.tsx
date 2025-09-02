import Image from "next/image";
import {
  DeploymentData,
  DeploymentFeatureType,
  DeploymentDiagram,
} from "@/types/types";

// 1. Deployment Title + Description
const DeploymentTitle = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <>
    <h2 className="text-2xl text-gray-800 font-semibold text-center mb-4">
      {title}
    </h2>
    <div className="sm:mx-64 text-center text-gray-400 mb-20 space-y-2">
      {description}
    </div>
  </>
);

// 2. Single Deployment Feature
const DeploymentFeature = ({
  feature,
  idx,
}: {
  feature: DeploymentFeatureType;
  idx: number;
}) => {
  // Vertical shift (only for laptop+)
  const shiftClass = idx % 2 === 0 ? "sm:-mt-10" : "sm:mt-40";

  // Horizontal shift (only for laptop+)
  const horizontalShift = idx % 2 === 0 ? "sm:ml-52" : "sm:mr-36";

  return (
    <div
      className={`flex flex-col items-center relative ${shiftClass} ${horizontalShift}`}
    >
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

          {/* Number */}
          <div className="flex justify-center w-full relative h-16">
            <div className="px-20 py-1 text-gray-900 font-semibold text-xl text-center relative z-10 top-11">
              {/* Desktop / Laptop View */}
              <div className="hidden sm:flex w-8 h-8 bg-[#C6C6C6] rounded-full items-center justify-center mx-auto text-white">
                {idx + 1}
              </div>

            </div>

            {/* Decorative borders (desktop only) */}
            <div
              className="absolute bg-gray-300 hidden sm:block"
              style={{
                width: "1px",
                height: "35%",
                top: 48,
                left: "21.7%",
                transform: "rotate(-45deg)",
                transformOrigin: "top left",
              }}
            ></div>

            <div
              className="absolute bg-gray-300 hidden sm:block"
              style={{
                width: "1px",
                height: "35%",
                top: 48,
                right: "21.7%",
                transform: "rotate(45deg)",
                transformOrigin: "top right",
              }}
            ></div>

            <div
              className="absolute bg-gray-300 hidden sm:block"
              style={{
                height: "1px",
                bottom: 0,
                left: "30%",
                right: "30%",
              }}
            ></div>
          </div>

          {/* Vertical Line (desktop only) */}
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-[1.4px] bg-gray-300 h-[calc(80vh)] sm:h-[600px] hidden sm:block" />
        </div>

        {/* Title + Description */}
        <div className="text-left ml-0 sm:ml-[-50px] w-full sm:w-64 mt-2">
          <h3 className="font-semibold text-gray-800 text-[16px] ">
            {feature.title}
          </h3>
          <div className="text-gray-500 mt-2 space-y-1 text-[12px] sm:w-74">
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
const DeploymentImage = ({ diagram }: { diagram?: DeploymentDiagram }) => {
  if (!diagram?.asset?.url) return null;

  return (
    <div id="deployment-image" className="relative sm:mt-16 mt-10 bg-white">
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
const DeploymentSectionDisplay = ({ data }: { data: DeploymentData }) => {
  if (!data.deploymentTitle) return null;

  return (
    <section id="deployment" className="scroll-mt-32 mt-10">
      <DeploymentTitle
        title={data.deploymentTitle}
        description={data.deploymentDescription}
      />

      {data.deploymentFeatures?.length > 0 && (
        <div className="relative sm:max-w-8xl mx-auto px-6 sm:px-12">
          {/* Features Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 relative">
            {data.deploymentFeatures.map((feature, idx) => (
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

export default DeploymentSectionDisplay;
