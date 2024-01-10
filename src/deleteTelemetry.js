
require('dotenv').config()

/**
 * Delete device's telemetries with thingsboard API
 * @param {string} entityType - The entity type (e.g., 'DEVICE').
 * @param {string} entityId - The entity ID.
 * @param {string} keys - Comma-separated list of telemetry keys.
 * @param {boolean} deleteAllDataForKeys - Specifies if all data for selected keys should be deleted.
 * @param {number} startTs - The start timestamp of the removal time range in milliseconds.
 * @param {number} endTs - The end timestamp of the removal time range in milliseconds.
 * @param {boolean} rewriteLatestIfDeleted - Specifies if the latest telemetry should be rewritten if it was removed.
 * @param {string} authorizationToken - The authorization token.
 * @returns {Promise} A promise that resolves with the API response.
 */
module.exports = async function deleteTelemetry(
  entityType,
  entityId,
  keys,
  deleteAllDataForKeys,
  startTs,
  endTs,
  rewriteLatestIfDeleted,
  authorizationToken
) {
    let url = `${process.env.DELETE_DNS}/${entityType}/${entityId}/timeseries/delete?keys=${encodeURIComponent(keys)}&deleteAllDataForKeys=${deleteAllDataForKeys}&rewriteLatestIfDeleted=${rewriteLatestIfDeleted}`;
    if (deleteAllDataForKeys != true){
        startTs = new Date(startTs).getTime()
        endTs = new Date(endTs).getTime()
        url += `&startTs=${startTs}&endTs=${endTs}`
    }
    const headers = {
        Accept: "application/json",
        "X-Authorization": `Bearer ${authorizationToken}`,
    };

    console.log('\t>> ', url);

    const response = await fetch(url, {
        method: "DELETE",
        headers: headers,
    });

    // console.log(response);

    if (response.ok) {
        return response;
    } else {
        throw new Error(
            `Failed to delete telemetry: ${response.status} ${response.statusText}`
        );
    }
}
