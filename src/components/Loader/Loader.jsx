import { Grid } from "react-loader-spinner";

const Loader = () => {
  return (
    <div>
      <Grid
        visible={true}
        height="180"
        width="180"
        color="#d8e339"
        ariaLabel="grid-loading"
        radius="12.5"
        wrapperStyle={{}}
        wrapperClass="grid-wrapper"
      />
    </div>
  );
};

export default Loader;
