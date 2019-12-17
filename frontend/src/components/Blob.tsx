import React, { useState } from 'react'
import { Upload, Icon, Modal } from "antd";

function getBase64(file: File) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}

const Blob = () => {
    const [previewVisible, setPreviewVisible] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [fileList, setFileList] = useState([])

    const handleCancel = () => setPreviewVisible(false)

    const handlePreview = async (file: any) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        console.log(file)
        setPreviewVisible(true)
        setPreviewImage(file.url || file.preview)
    };

    const handleChange = ({ fileList }: any) => setFileList(fileList);
    const uploadButton = (
        <div>
            <Icon type="plus" />
            <div style={{ marginTop: 8, color: "#black" }}>Upload</div>
        </div>
    );

    return (
        <div className="clearfix">
            <Upload
                // TODO: Action uplod API
                action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                //fileList={fileList}
                listType="picture-card"
                onPreview={handlePreview}
                //onChange={handleChange}
            >{ uploadButton }
            </Upload>
            <Modal visible={previewVisible} footer={null} onCancel={handleCancel}>
                <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
        </div>
    );
}

export default Blob
