// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
// @ts-ignore
import formidable from "formidable";
import { getPrivateRef, getPublicRef, storage } from "../../util";
import { ref, uploadBytes } from "firebase/storage";

import { getSession } from "next-auth/react";
import { extname } from "path";
import { readFileSync } from "fs";
//set bodyparser
export const config = {
  api: {
    bodyParser: false,
  },
};
type Data = {
  error?: any;
  path?: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const sess = await getSession({ req });
  console.log(sess);
  if (!sess) {
    res.status(401).json({ error: "Not logged in" });
    return;
  }
  const { error, fields, files } = await new Promise((resolve, reject) => {
    const form = formidable();
    form.parse(req, (error: any, fields: any, files: any) => {
      resolve({ error, fields, files });
    });
  });
  if (error) {
    res.status(500).json({ error });
  } else {
    console.log(fields);
    console.log(files.file);
    const fileName =
      files.file.newFilename + extname(files.file.originalFilename);
    // @ts-ignore
    if (sess?.user?.id) {
      const location = (
        fields.private === "true" ? getPrivateRef : getPublicRef
      )(
        // @ts-ignore
        sess.user.id,
        fileName
      );

      await uploadBytes(location, readFileSync(files.file.filepath), {
        contentType: files.file.mimetype,
      })
        .then((result) => {
          res.status(200).json({
            error: null,
            path: result.ref.fullPath,
          });
        })
        .catch((e) => {
          res.status(500).json({ error: e.message });
        });
    } else {
      res.status(401).json({ error: "Not logged in" });
    }
    // res.status(200).json({ fields });
    // console.log(files.file);
  }
}
