export default function StarsRate({ rate }) {
  return (
    <div className="stars_rate d-flex align-items-center justify-content-center gap-2">
      <div className="stars">
        {rate ? (
          <>
            {Array(Math.round(rate))
              .fill(0)
              .map(() => {
                return (
                  <img
                    key={Math.random()}
                    src="/icons/star-filled.svg"
                    alt="filled star"
                  />
                );
              })}
          </>
        ) : null}

        {Array(5 - Math.round(rate))
          .fill(0)
          .map(() => {
            return <img key={Math.random()} src="/icons/star.svg" alt="star" />;
          })}
      </div>
      <span className="m-0">[ {rate} ]</span>
    </div>
  );
}
