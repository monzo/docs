# Attachments

Images (eg. receipts) can be attached to transactions by uploading these via the `attachment` API. Once an attachment is *registered* against a transaction, the image will be shown in the transaction detail screen within the Monzo app.

There are two options for attaching images to transactions - either Monzo can host the image, or remote images can be displayed.

If Monzo is hosting the attachment the upload process consists of three steps:

1. Obtain a temporary authorised URL to [upload](#upload-attachment) the attachment to.
2. Upload the file to this URL.
3. [Register](#register-attachment) the attachment against a `transaction`.

If you are hosting the attachment, you can simply register the attachment with the transaction:

1. [Register](#register-attachment) the attachment against a `transaction`.

## Upload attachment

The first step when uploading an attachment is to obtain a temporary URL to which the file can be uploaded. The response will include a `file_url` which will be the URL of the resulting file, and an `upload_url` to which the file should be uploaded to.

```shell
$ http --form POST "https://api.monzo.com/attachment/upload" \
    "Authorization: Bearer $access_token" \
    "file_name=foo.png" \
    "file_type=image/png" \
    "content_length=12345"
```

```json
{
    "file_url":"https://s3-eu-west-1.amazonaws.com/mondo-image-uploads/user_00009237hliZellUicKuG1/LcCu4ogv1xW28OCcvOTL-foo.png",
    "upload_url":"https://mondo-image-uploads.s3.amazonaws.com/user_00009237hliZellUicKuG1/LcCu4ogv1xW28OCcvOTL-foo.png?AWSAccessKeyId={EXAMPLE_AWS_ACCESS_KEY_ID}\u0026Expires=1447353431\u0026Signature=k2QeDCCQQHaZeynzYKckejqXRGU%!D(MISSING)"
}
```

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`file_name`<br><span class="label">Required</span>|The name of the file to be uploaded
`file_type`<br><span class="label">Required</span>|The content type of the file
`content_length`<br><span class="label">Required</span>|The HTTP Content-Length of the upload request body, in bytes.

##### Response arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`file_url`|The URL of the file once it has been uploaded
`upload_url`|The URL to `POST` the file to when uploading


## Register attachment

Once you have obtained a URL for an attachment, either by uploading to the `upload_url` obtained from the `upload` endpoint above or by hosting a remote image, this URL can then be registered against a transaction. Once an attachment is registered against a transaction this will be displayed on the detail page of a transaction within the Monzo app.

```shell
$ http --form POST "https://api.monzo.com/attachment/register" \
    "Authorization: Bearer $access_token" \
    "external_id=tx_00008zIcpb1TB4yeIFXMzx" \
  	"file_type=image/png" \
    "file_url=https://s3-eu-west-1.amazonaws.com/mondo-image-uploads/user_00009237hliZellUicKuG1/LcCu4ogv1xW28OCcvOTL-foo.png"
```

```json
{
    "attachment": {
        "id": "attach_00009238aOAIvVqfb9LrZh",
        "user_id": "user_00009238aMBIIrS5Rdncq9",
        "external_id": "tx_00008zIcpb1TB4yeIFXMzx",
        "file_url": "https://s3-eu-west-1.amazonaws.com/mondo-image-uploads/user_00009237hliZellUicKuG1/LcCu4ogv1xW28OCcvOTL-foo.png",
        "file_type": "image/png",
        "created": "2015-11-12T18:37:02Z"
    }
}
```

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`external_id`<br><span class="label">Required</span>|The id of the `transaction` to associate the `attachment` with.
`file_url`<br><span class="label">Required</span>|The URL of the uploaded attachment.
`file_type`<br><span class="label">Required</span>|The content type of the attachment.

##### Response arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`id`|The ID of the attachment. This can be used to deregister at a later date.
`user_id`|The id of the `user` who owns this `attachment`.
`external_id`|The id of the `transaction` to which the `attachment` is attached.
`file_url`|The URL at which the `attachment` is available.
`file_type`|The file type of the `attachment`.
`created`|The timestamp *in UTC* when the attachment was created.

## Deregister attachment

To remove an `attachment`, simply deregister this using its `id`

```shell
$ http --form POST "https://api.monzo.com/attachment/deregister" \
    "Authorization: Bearer $access_token" \
    "id=attach_00009238aOAIvVqfb9LrZh"
```

```json
{}
```

##### Request arguments

<span class="hide">Parameter</span> | <span class="hide">Description</span>
------------------------------------|--------------------------------------
`id`<br><span class="label">Required</span>|The id of the `attachment` to deregister.
