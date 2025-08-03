import { UploadOutlined } from "@ant-design/icons";
import { Button, Upload, message } from "antd";

type SwaggerUploaderProps = {
    className?: string;
};

export default ({ className }: SwaggerUploaderProps) => {
    const handleUpload = async (file: File) => {
        try {
            const text = await file.text();
            const swagger = JSON.parse(text);

            const ref =
                swagger.paths?.["/users"]?.post?.requestBody?.content?.[
                    "application/json"
                ]?.schema?.$ref;
            if (!ref) {
                message.error("Schema ref not found");
                return false;
            }

            const schema = resolveRef(ref, swagger);
            console.log("Input schema:", schema);
            message.success("Schema parsed. Check console.");
        } catch (e) {
            message.error("Failed to parse Swagger file");
        }

        return false;
    };

    const resolveRef = (ref: string, doc: any) => {
        const parts = ref.replace(/^#\//, "").split("/");
        return parts.reduce((obj, key) => obj?.[key], doc);
    };

    return (
        <Upload beforeUpload={handleUpload} showUploadList={false}>
            <Button
                className={className}
                size="small"
                icon={<UploadOutlined />}
            >
                Upload Swagger JSON
            </Button>
        </Upload>
    );
};
