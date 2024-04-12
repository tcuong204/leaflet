import {createControlHook}  from '@react-leaflet/core'

const useCustomControl = (props) => {
  const { position, content } = props;

  // Sử dụng useEffect để thêm control vào bản đồ khi component được mount
  React.useEffect(() => {
    const { leaflet } = props;
    const map = leaflet.getMap();

    // Tạo control và định nghĩa hành động khi được thêm vào bản đồ
    const control = L.control({ position });

    control.onAdd = function () {
      const div = L.DomUtil.create("div", "leaflet-control");
      div.innerHTML = content;
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

// Sử dụng custom control component trong ứng dụng của bạn
