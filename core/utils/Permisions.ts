class Permisions {

    public requestOrientation = () => {

        if (window.DeviceOrientationEvent) {
            console.log("orientation: has orientation -> try activate");
            if (typeof DeviceOrientationEvent.requestPermission === 'function') {
                console.log("orientation: can request (ios13+");
                // iOS 13+
                DeviceOrientationEvent.requestPermission()
                    .then(response => {
                        if (response == 'granted') {
                            console.log("orientation: request -> granted");
                            return true;
                        } else {
                            console.log("orientation: request -> denied -> error");
                            alert("orientation error")
                        }
                    })
                    .catch(console.error)
            } else {
                // non iOS 13+
                console.log("orientation: can not request (non ios13+)");
                return true;
            }
        } else {
            console.log("orientation: has no orientation -> error");
            alert("orientation error")
        }
    }
}

export default new Permisions