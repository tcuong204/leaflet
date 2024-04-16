import React, { useEffect, useMemo, useState } from "react";
import "leaflet/dist/leaflet.css";
import { LayersControl, MapContainer, Marker, Polygon, Popup, TileLayer, useMapEvents, LayerGroup, Circle, FeatureGroup, Rectangle, LayersControlProps, useMap } from "react-leaflet";
import { data } from "./data";
import 'leaflet/dist/leaflet.css';
import { Icon } from "leaflet";
import './style/leaflet.css'
import { createControlComponent } from '@react-leaflet/core'
import { createControlHook } from '@react-leaflet/core'
import { Control } from "leaflet";
import * as L from "leaflet"
import { useLeafletContext } from '@react-leaflet/core'
import { EditControl } from "react-leaflet-draw";
import "leaflet-draw/dist/leaflet.draw-src.css";
import { Layer } from "leaflet";
const Popup1 =(layer)  => {
//   const edit = L.EditToolbar.Edit((map, {
//     featureGroup: drawControl.options.featureGroup,
//     selectedPathOptions: drawControl.options.edit.selectedPathOptions
// }))
  const context = useLeafletContext()
  context.map.on('draw:created', function (e) {
      context.map.eachLayer(function(){
        layer = e.layer
        console.log("created",layer);
        const area= L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]).toFixed(3)
        const div = document.createElement("div");
        div.innerHTML = `<h3 className="kq">Kết quả phép đo:<br></h3><br><b>Diện tích:</b><p>${area} m²</p> <h3></h3><br>`;
        const option = document.createElement("div");
        option.className="option"
        const button = document.createElement("div");
        button.innerHTML = "Sửa";
        button.className="onclick"
        button.onclick = function() {
          document.querySelector('.leaflet-draw-edit-edit').click();
        }
        const button1 = document.createElement("div");
        button1.innerHTML = "Xóa cờ đánh lại";
        button1.className="onclick"
        button1.onclick = function() {
          context.map.removeLayer(layer)
        }
        option.appendChild(button);
        option.appendChild(button1);
        div.appendChild(option)
        layer.bindPopup(div).openPopup(layer)       
      })  
      
  })
  context.map.on('draw:edited', function (e){
    context.map.eachLayer(function(){
      var center = e.sourceTarget._lastCenter
      layer = e.layers
      console.log("edited",layer._layers);
      // const area= L.GeometryUtil.geodesicArea(layer.getLatLngs()[0]).toFixed(3)
      // const div = document.createElement("div");
      // div.innerHTML = `<h3 className="kq">Kết quả phép đo:<br></h3><br><b>Diện tích:</b><p>${area} m²</p> <h3></h3><br>`;
      // const option = document.createElement("div");
      // option.className="option"
      // const button = document.createElement("div");
      // button.innerHTML = "Căn giữa";
      // button.className="onclick"
      // button.onclick = function() {
      //   context.map.fitBounds(layer.getBounds())
      // }
      // const button1 = document.createElement("div");
      // button1.innerHTML = "Xóa cờ đánh lại";
      // button1.className="onclick"
      // button1.onclick = function() {
      //   context.map.removeLayer(layer)
      // }
      // option.appendChild(button);
      // option.appendChild(button1);
      // div.appendChild(option)
      // layer.bindPopup(div).openPopup(layer)       
    })  
    
  })
}
L.drawLocal = {
  draw: {
    toolbar: {
      actions: {
        title: 'Cancel drawing',
        text: 'Hủy bỏ'
      },
      finish: {
        title: 'Finish drawing',
        text: 'Hoàn thành'
      },
      undo: {
        title: 'Delete last point drawn',
        text: 'Xóa điểm cuối'
      },
      buttons: {
        polyline: 'Draw a polyline',
        polygon: 'Draw a polygon',
        rectangle: 'Draw a rectangle',
        circle: 'Draw a circle',
        marker: 'Draw a marker',
        circlemarker: 'Draw a circlemarker'
      }
    },
    handlers: {
      circle: {
        tooltip: {
          start: 'Click and drag to draw circle.'
        },
        radius: 'Radius'
      },
      circlemarker: {
        tooltip: {
          start: 'Click map to place circle marker.'
        }
      },
      marker: {
        tooltip: {
          start: 'Click map to place marker.'
        }
      },
      polygon: {
        tooltip: {
          start: 'Click để bắt đầu vẽ',
          cont: '',
          end: 'Click điểm đầu tiên để kết thúc'
        }
      },
      polyline: {
        error: '<strong>Error:</strong> shape edges cannot cross!',
        tooltip: {
          start: 'Click to start drawing line.',
          cont: 'Click to continue drawing line.',
          end: 'Click last point to finish line.'
        }
      },
      rectangle: {
        tooltip: {
          start: 'Click and drag to draw rectangle.'
        }
      },
      simpleshape: {
        tooltip: {
          end: 'Release mouse to finish drawing.'
        }
      }
    }
  },
  edit: {
    toolbar: {
      actions: {
        save: {
          title: 'Save changes',
          text: 'Lưu'
        },
        cancel: {
          title: 'Cancel editing, discards all changes',
          text: 'Hủy bỏ'
        },
        clearAll: {
          title: 'Clear all layers',
          text: 'Xóa tất acr'
        }
      },
      buttons: {
        edit: 'Edit layers',
        editDisabled: 'No layers to edit',
        remove: 'Delete layers',
        removeDisabled: 'No layers to delete'
      }
    },
    handlers: {
      edit: {
        tooltip: {
          text: 'Drag handles or markers to edit features.',
          subtext: 'Click cancel to undo changes.'
        }
      },
      remove: {
        tooltip: {
          text: 'Click on a feature to remove.'
        }
      }
    }
  }
};
const drawPolygon = {
  rectangle: false,
  circle: false,
  circlemarker: false,
  marker: false,
  polyline: false,
  polygon: {
    allowIntersection: true, // Restricts shapes to simple polygons
    drawError: {
      color: '#e1e100', // Color the shape will turn when intersects
      message: '<strong><strong> Bạn vẽ sai rồi' // Message that will show when intersect
    },
    shapeOptions: {
      color: '#bada55'
    },
    toolTip: {
      handler: {
        start: 'Click to shape.',
        cont: 'Click to shape.',
        end: 'Click firsts shape.'
      }
    }
  }

}
function ClickHandler({ onClick }) {
  const map = useMapEvents({
    click(event) {
      onClick(event);
    },
  });

  return null;
}
const name = () => {
  return (
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
  const { isopenmarkingBox, setopenmarkingBox, isMarking, setisMarking, setClickedPositions, clickedPositions, setconfirmPosition, confirmPosition } = props
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
  const delMark = () => {
    setisMarking(false)
    setopenmarkingBox(false)
    setClickedPositions([])
  }
  const confirm = (event) => {
    setisMarking(false)
    setconfirmPosition(clickedPositions)
    setClickedPositions([])
    event.preventDefault()
    event.stopPropagation();
  }
  console.log(() => confirm);
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
              <div className="confirm" onClick={e => confirm(e)}><h5>Xác nhận</h5></div>
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
  const [position, setposition] = useState([])
  const [clickedPositions, setClickedPositions] = useState([]);
  const [isopenmarkingBox, setopenmarkingBox] = useState(false);
  const [isMarking, setisMarking] = useState(false)
  const [confirmPosition, setconfirmPosition] = useState([])
  const [drawnItems, setDrawnItems] = useState(null);
  const [layer, setlayer] = useState([])
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
  const limeOptions = { color: 'green', fillColor: '#008103' }
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
          {clickedPositions.map((position, index) => (<>
            <Marker key={index} position={position} icon={newIcon}>
              <Popup>Position {index + 1}: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}</Popup>
            </Marker>

          </>
          ))}
          {isMarking && <>
            <ClickHandler onClick={handleClick} />
            <Polygon pathOptions={limeOptions} positions={clickedPositions} />
          </>}

          {/* <OpenmarkingBox
            isopenmarkingBox={isopenmarkingBox}
            setopenmarkingBox={setopenmarkingBox}
            setisMarking={setisMarking}
            isMarking={isMarking}
            setClickedPositions={setClickedPositions}
            setconfirmPosition={setconfirmPosition}
            clickedPositions={clickedPositions}
            confirmPosition={confirmPosition}
          /> */}
          {confirmPosition.map((position, index) => (<>
            <Marker key={index} position={position} icon={newIcon}>
              <Popup>Position {index + 1}: {position.lat.toFixed(6)}, {position.lng.toFixed(6)}</Popup>
            </Marker>
            <Polygon pathOptions={limeOptions} positions={confirmPosition} />
          </>
          ))}
          <FeatureGroup>
            <EditControl
              position='topright'
              draw={drawPolygon}
            >
            </EditControl>
            {drawnItems && <Popup position={drawnItems.getLatLng()}>Popup Content</Popup>}
            <Popup1  />
          </FeatureGroup>
        </MapContainer>

      )}
    </div>
  );
}