async function fetchData(
  instrument: string,
  format: string,
  resultCount: number,
  ra: number,
  dec: number,
  radius: number
) {
  const heasarc_api_url = 'https://heasarc.gsfc.nasa.gov/xamin/QueryServlet'
  const formData = new FormData()

  formData.append('table', instrument)
  formData.append('format', format)
  formData.append('resultmax', resultCount.toString())
  formData.append('radius', radius.toString())
  formData.append('position[]', ra.toString())
  formData.append('position[]', dec.toString())

  try {
    const response = await fetch(heasarc_api_url, {
      method: 'POST',
      body: formData,
    })
    const data =
      format === 'json' ? await response.json() : await response.text()
    return data
  } catch (error) {
    console.log(error)
  }
}

export async function getInstrumentData(
  instrument: string,
  format: string,
  resultCount: number,
  ra: number,
  dec: number,
  radius: number
) {
  try {
    const response = await fetchData(
      instrument,
      format,
      resultCount,
      ra,
      dec,
      radius
    )
    return response
  } catch (error) {
    console.log(error)
  }
}
