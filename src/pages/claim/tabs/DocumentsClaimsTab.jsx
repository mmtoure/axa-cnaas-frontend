import React from 'react'

import UploadField from '../../../components/UplaodFile'
import { FILE_BASE } from '../../../util/api'
import FileViewer from '../../../components/FileViewer'

const DocumentsClaimsTab = ({ documents }) => {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
  {documents.map(doc => (
    <FileViewer
      key={doc.id}
      fileUrl={`${FILE_BASE}/claims/${doc.id}`}
      label={doc.type}
      fileName={doc.fileName}
      id={doc.id}
    />
  ))}
</div>
    </div>
  )
}

export default DocumentsClaimsTab