let ogImageRatio
const uploadBox = document.querySelector(".upload-box"),
  previewImg = uploadBox.querySelector("img"),
  fileInput = uploadBox.querySelector("input"),
  widthInput = document.querySelector(".width input"),
  heightInput = document.querySelector(".height input"),
  ratioInput = document.querySelector(".ratio input"),
  qualityInput = document.querySelector(".quality input"),
  downloadBtn = document.querySelector(".download-btn")

widthInput.addEventListener("keyup", () => {
  let e = ratioInput.checked
    ? widthInput.value / ogImageRatio
    : heightInput.value
  heightInput.value = Math.floor(e)
}),
  heightInput.addEventListener("keyup", () => {
    let e = ratioInput.checked
      ? heightInput.value * ogImageRatio
      : widthInput.value
    widthInput.value = Math.floor(e)
  }),
  downloadBtn.addEventListener("click", () => {
    let e = document.createElement("canvas"),
      t = document.createElement("a"),
      i = e.getContext("2d"),
      a = qualityInput.checked ? 0.5 : 1
    ;(e.width = widthInput.value),
      (e.height = heightInput.value),
      i.drawImage(previewImg, 0, 0, e.width, e.height),
      (t.href = e.toDataURL("image/jpeg", a)),
      (t.download = new Date().getTime()),
      t.click()
  }),
  fileInput.addEventListener("change", (e) => {
    let t = e.target.files[0]
    t &&
      ((previewImg.src = URL.createObjectURL(t)),
      previewImg.addEventListener("load", () => {
        ;(widthInput.value = previewImg.naturalWidth),
          (heightInput.value = previewImg.naturalHeight),
          (ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight),
          document.querySelector(".wrapper").classList.add("active")
      }))
  }),
  uploadBox.addEventListener("click", () => fileInput.click())

uploadBox.addEventListener("dragover", (e) => {
  e.preventDefault()
  uploadBox.classList.add("dragover")
})

uploadBox.addEventListener("dragleave", () => {
  uploadBox.classList.remove("dragover")
})

uploadBox.addEventListener("drop", (e) => {
  e.preventDefault()
  uploadBox.classList.remove("dragover")

  const files = e.dataTransfer.files
  if (files.length > 0) {
    const file = files[0]
    if (file.type.startsWith("image/")) {
      previewImg.src = URL.createObjectURL(file)
      previewImg.addEventListener("load", () => {
        widthInput.value = previewImg.naturalWidth
        heightInput.value = previewImg.naturalHeight
        ogImageRatio = previewImg.naturalWidth / previewImg.naturalHeight
        document.querySelector(".wrapper").classList.add("active")
      })
    }
  }
})
