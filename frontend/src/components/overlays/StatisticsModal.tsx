import StatisticsModalPortal from "../../portals/StatisticsModalPortal";
import Button from "react-bootstrap/Button";

export default function StatisticsModal({
  overlayState,
  closeOverlay,
  statistics,
}: any) {
  return (
    <StatisticsModalPortal>
      {overlayState && (
        <>
          <div className="background-overlay" onClick={closeOverlay}></div>
          <div className="menu-overlay statistics-modal">
            <div className="menu-close" onClick={closeOverlay}>
              <i className="bi bi-x-lg"></i>
            </div>
            <h2 className="text-center mb-3">სტატისტიკა</h2>
            <table className="table table-bordered">
              <thead>
                <tr>
                  <th>კინოთეატრი</th>
                  <th>პროდუქტების რაოდენობა</th>
                  <th>პროდუქტების ჯამური საფასური</th>
                </tr>
              </thead>
              <tbody>
                {statistics.map((stat: any) => (
                  <tr key={stat.locationId}>
                    <td>{stat.locationName}</td>
                    <td>{stat.totalCount}</td>
                    <td>{stat.totalPrice}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <Button variant="secondary" onClick={closeOverlay} className="mt-3">
              დაბრუნება
            </Button>
          </div>
        </>
      )}
    </StatisticsModalPortal>
  );
}
