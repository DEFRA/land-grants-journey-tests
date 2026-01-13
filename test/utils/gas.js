import { mockServerClient } from 'mockserver-client'

class Gas {
  async setStatusQueryResponse(referenceNumber, gasStatus) {
    const client = mockServerClient(
      process.env.MOCKSERVER_HOST,
      process.env.MOCKSERVER_PORT
    )
    await client.mockAnyResponse({
      id: `applications-${referenceNumber}-status`,
      priority: 999,
      httpRequest: {
        method: 'GET',
        path: `/grants/[^/]+/applications/${referenceNumber.toLowerCase()}/status`
      },
      httpResponse: {
        statusCode: 200,
        body: {
          type: 'JSON',
          json: {
            status: gasStatus
          }
        }
      },
      times: {
        remainingTimes: 1,
        unlimited: false
      }
    })
  }
}

export default new Gas()
