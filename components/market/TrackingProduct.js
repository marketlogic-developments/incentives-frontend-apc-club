const TrackingProduct = ({ info }) => {
  return (
    <div className="flex">
      <div className="flex flex-col items-center gap-2 border-y-4 border-double rounded-lg border-red-700 justify-center p-5 w-1/4">
        <figure className="flex" style={{ width: "50%" }}>
          <img src={info.img} alt={info.name} />
        </figure>
        <p>{info.name}</p>
      </div>
      <div className="w-full">
        <div className="row">
          <div className="col-12 col-md-10 hh-grayBox pt45 pb20">
            <div className="flex">
              <div className="order-tracking completed">
                <span className="is-complete"></span>
                <p>
                  Orden Recibida
                  <br />
                  <span>Mon, June 24</span>
                </p>
              </div>
              <div className="order-tracking completed">
                <span className="is-complete"></span>
                <p>
                  Aprobada
                  <br />
                  <span>Mon, June 24</span>
                </p>
              </div>
              <div className="order-tracking completed">
                <span className="is-complete"></span>
                <p>
                  En Proceso de pago
                  <br />
                  <span>Tue, June 25</span>
                </p>
              </div>
              <div className="order-tracking">
                <span className="is-complete"></span>
                <p>
                  Enviada
                  <br />
                  <span>Fri, June 28</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackingProduct;
