import React, { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import { LayersControl, MapContainer, Marker, Polygon, Popup, TileLayer, useMapEvents,LayerGroup,Circle,FeatureGroup,Rectangle,LayersControlProps, useMap } from "react-leaflet";
import { data } from "./data";
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import './style/leaflet.css'
import { createControlComponent } from '@react-leaflet/core'
import {EditControl} from "leaflet-draw"
import { createControlHook } from '@react-leaflet/core'
import L from 'leaflet'
import { Control } from "leaflet";
const useCustomControl = (props) => {
  const { position, htmlContent } = props;

  // Sử dụng useEffect để thêm control vào bản đồ khi component được mount
  React.useEffect(() => {
    const { leaflet } = props;
    const map = leaflet.getMap();

    // Tạo control và định nghĩa hành động khi được thêm vào bản đồ
    const control = L.control({ position });

    control.onAdd = function () {
      const div = L.DomUtil.create("div", "leaflet-control");
      div.innerHTML = htmlContent; // Sử dụng HTML content ở đây
      return div;
    };

    control.addTo(map);

    // Loại bỏ control khi component bị unmount
    return () => {
      control.remove();
    };
  }, []);

  // Trả về null vì control được thêm vào bản đồ bằng cách sử dụng useEffect
  return null;
};

// Tạo một custom hook component từ useCustomControl
const useCustomControlComponent = createControlHook(useCustomControl);
  const htmlContent = `
    <div>
      <h2>Custom Layer Control</h2>
      <input type="checkbox" id="layer1" checked>
      <label for="layer1">Layer 1</label><br>
      <input type="checkbox" id="layer2" checked>
      <label for="layer2">Layer 2</label><br>
      <input type="checkbox" id="layer3" checked>
      <label for="layer3">Layer 3</label>
    </div>
  `
function ClickHandler({ onClick }) {
  const map = useMapEvents({
    click(event) {
      onClick(event);
    },
  });

  return null;
}
const name=()=>{
  return(
    <>
    <h4>Hướng dẫn cách đo</h4>
        <p>Chọn 1 điểm: Kết quả là toạ độ của điểm.</p>
        <p>Chọn 2 điểm: Kết quả là độ dài khoảng cách.</p>
        <p>Chọn 3 điểm trở lên: Kết quả là diện tích và chu vi.</p>
        <h5>Nhấn vào đây để bắt đầu</h5>
    </>
  )
}
const OpenmarkingBox = props => {
   const center = [51.505, -0.09]
const rectangle = [
  [51.49, -0.08],
  [51.5, -0.06],
]
  const { isopenmarkingBox, setopenmarkingBox,isMarking, setisMarking,setClickedPositions,clickedPositions,setconfirmPosition,confirmPosition} = props
  const Markingbox = () => {
    setopenmarkingBox(!isopenmarkingBox)
    if (isopenmarkingBox === false) {
      setisMarking(false)
      setClickedPositions([])
    }
  }
  const marking = () => {
    setisMarking(true)
    setopenmarkingBox(false)
  }
  const delMark = ()=>{
    setisMarking(false)
    setopenmarkingBox(false)
    setClickedPositions([])
  }
  const confirm=()=>{
    setconfirmPosition(clickedPositions)
    setisMarking(false)
    setClickedPositions([])
  }
  return (
    <>
    <div className="box" onClick={Markingbox}><img src="https://www.iconfinder.com/icons/3738251/education_learning_pencil_ruler_school_supplies_icon" alt="icon"></img></div>
      {isopenmarkingBox && <div className="markingBoxes"><div className="markingBoxes-text">
        <h4>Hướng dẫn cách đo</h4>
        <p>Chọn 1 điểm: Kết quả là toạ độ của điểm.</p>
        <p>Chọn 2 điểm: Kết quả là độ dài khoảng cách.</p>
        <p>Chọn 3 điểm trở lên: Kết quả là diện tích và chu vi.</p>
        <h5 onClick={marking}>Nhấn vào đây để bắt đầu</h5>
      </div></div>}
      {isMarking &&
      <div className="markingBoxes">
      <div className="markingBoxes-text">
        <h3>Đang thực hiện phép đo</h3>
        <p>Tọa độ điểm cuối</p>
        <p>Chiều dài</p>
        <p>Diện tích</p>
        <div className="align-item-mark">
          <div className="confirm" onClick={delMark}><h5>Hủy bỏ</h5></div>
          <div className="confirm" onClick={confirm}><h5>Xác nhận</h5></div>
        </div>
      </div>

    </div>
    }
     {/* <LayersControl position="topright">
      <LayersControl.Overlay name="Hưỡng dẫn cách đo">
        <Marker position={center}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      </LayersControl.Overlay>
       <LayersControl.Overlay checked name="Layer group with circles">
        <LayerGroup>
          <Circle
            center={center}
            pathOptions={{ fillColor: 'blue' }}
            radius={200}
          />
          <Circle
            center={center}
            pathOptions={{ fillColor: 'red' }}
            radius={100}
            stroke={false}
          />
          <LayerGroup>
            <Circle
              center={[51.51, -0.08]}
              pathOptions={{ color: 'green', fillColor: 'green' }}
              radius={100}
            />
          </LayerGroup>
        </LayerGroup>
      </LayersControl.Overlay>
      <LayersControl.Overlay name="Feature group">
        <FeatureGroup pathOptions={{ color: 'purple' }}>
          <Popup>Popup in FeatureGroup</Popup>
          <Circle center={[51.51, -0.06]} radius={200} />
          <Rectangle bounds={rectangle} />
        </FeatureGroup>
      </LayersControl.Overlay> 
     </LayersControl>   */}
    </>
  )
}
export default function App() {
  const [position,setposition]=useState([])
  const [clickedPositions, setClickedPositions] = useState([]);
  const [isopenmarkingBox, setopenmarkingBox] = useState(false);
  const [isMarking, setisMarking] = useState(false)
  const [confirmPosition,setconfirmPosition]=useState([])
  console.log("isMarking: ",isMarking)
  console.log("confirmPosition: ",confirmPosition)
  console.log("clickedPosition: ",clickedPositions)
  function handleClick(event) {
    const newClickedPosition = event.latlng;
    setClickedPositions(prevPositions => [...prevPositions, newClickedPosition]);
  }
  const [coordinates, setCoordinates] = useState([]);
  useEffect(() => {
    setCoordinates(data.map((row) => [row[1], row[0]]));
  }, []);
  const newIcon = new Icon({
    iconUrl: "./button.png",
    iconSize: [8, 8]
  })
  const limeOptions = { color: 'green',fillColor:'#008103' }
  return (
    <div style={{ width: 100 + "vw", height: 100 + "vh" }}>
      {coordinates.length && (
        <MapContainer
          style={{ width: 100 + "%", height: 100 + "%" }}
          bounds={coordinates}
          boundsOptions={{ padding: [1, 1] }}
          scrollWheelZoom={true}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          { clickedPositions.map((position, index) => (<>
            <Marker key={index} position={position} icon={newIcon}>
              <Popup>Position {index + 1}: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}</Popup>
            </Marker>
            
            </>
          ))}
          {isMarking && <>
            <ClickHandler onClick={handleClick} />
            <Polygon pathOptions={limeOptions} positions={clickedPositions} />
          </>}

          <OpenmarkingBox
            isopenmarkingBox={isopenmarkingBox}
            setopenmarkingBox={setopenmarkingBox}
            setisMarking={setisMarking}
            isMarking={isMarking}
            setClickedPositions={setClickedPositions}
            setconfirmPosition={setconfirmPosition}
            clickedPositions={clickedPositions}
            confirmPosition={confirmPosition}
          />
          {confirmPosition.map((position, index) => (<>
            <Marker key={index}  position={position} icon={newIcon}>
              <Popup>Position {index + 1}: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}</Popup>
            </Marker>   
            <Polygon pathOptions={limeOptions} positions={confirmPosition} />        
            </>
          ))}
                  <useCustomControlComponent position="topright" htmlContent ={htmlContent}/>
        </MapContainer>

      )}
    </div>
  );
}