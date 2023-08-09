async function fetchData(
  instrument: string,
  format: string,
  resultCount: number
) {
  const heasarc_api_url = 'https://heasarc.gsfc.nasa.gov/xamin/QueryServlet'
  const formData = new FormData()
  formData.append('table', instrument)
  formData.append('format', format)
  formData.append('resultmax', resultCount.toString())

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
  resultCount: number
) {
  try {
    const response = await fetchData(instrument, format, resultCount)
    return response
  } catch (error) {
    console.log(error)
  }
}
