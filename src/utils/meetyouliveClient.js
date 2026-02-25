/**
 * MeetYouLive API Client
 * Handles integration with meetyoulive.app for video conferencing
 */

const MEETYOULIVE_API_URL = import.meta.env.VITE_MEETYOULIVE_API_URL || 'https://meetyoulive.app/api'
const MEETYOULIVE_API_KEY = import.meta.env.VITE_MEETYOULIVE_API_KEY || ''
const MEETYOULIVE_WORKSPACE_ID = import.meta.env.VITE_MEETYOULIVE_WORKSPACE_ID || ''

/**
 * Check if MeetYouLive is configured
 */
export const isMeetYouLiveConfigured = () => {
  return Boolean(MEETYOULIVE_API_KEY && MEETYOULIVE_WORKSPACE_ID)
}

/**
 * Create headers for API requests
 */
const getHeaders = () => {
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${MEETYOULIVE_API_KEY}`,
    'X-Workspace-ID': MEETYOULIVE_WORKSPACE_ID
  }
}

/**
 * Create a new meeting room
 * @param {Object} meetingData - Meeting configuration
 * @param {string} meetingData.title - Meeting title
 * @param {string} meetingData.description - Meeting description
 * @param {Date} meetingData.scheduledTime - Scheduled meeting time
 * @param {number} meetingData.duration - Duration in minutes
 * @returns {Promise<Object>} Meeting details including room URL
 */
export const createMeeting = async (meetingData) => {
  if (!isMeetYouLiveConfigured()) {
    throw new Error('MeetYouLive no está configurado. Por favor añade las credenciales en .env')
  }

  try {
    const response = await fetch(`${MEETYOULIVE_API_URL}/meetings`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        title: meetingData.title,
        description: meetingData.description,
        scheduled_time: meetingData.scheduledTime?.toISOString(),
        duration_minutes: meetingData.duration || 60,
        workspace_id: MEETYOULIVE_WORKSPACE_ID
      })
    })

    if (!response.ok) {
      throw new Error(`Error al crear reunión: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      success: true,
      meeting: data,
      roomUrl: data.room_url || data.url,
      meetingId: data.id
    }
  } catch (error) {
    console.error('Error creating meeting:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Get meeting details
 * @param {string} meetingId - Meeting ID
 * @returns {Promise<Object>} Meeting details
 */
export const getMeeting = async (meetingId) => {
  if (!isMeetYouLiveConfigured()) {
    throw new Error('MeetYouLive no está configurado')
  }

  try {
    const response = await fetch(`${MEETYOULIVE_API_URL}/meetings/${meetingId}`, {
      method: 'GET',
      headers: getHeaders()
    })

    if (!response.ok) {
      throw new Error(`Error al obtener reunión: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      success: true,
      meeting: data
    }
  } catch (error) {
    console.error('Error getting meeting:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * List all meetings
 * @param {Object} filters - Optional filters
 * @returns {Promise<Object>} List of meetings
 */
export const listMeetings = async (filters = {}) => {
  if (!isMeetYouLiveConfigured()) {
    throw new Error('MeetYouLive no está configurado')
  }

  try {
    const queryParams = new URLSearchParams({
      workspace_id: MEETYOULIVE_WORKSPACE_ID,
      ...filters
    })

    const response = await fetch(`${MEETYOULIVE_API_URL}/meetings?${queryParams}`, {
      method: 'GET',
      headers: getHeaders()
    })

    if (!response.ok) {
      throw new Error(`Error al listar reuniones: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      success: true,
      meetings: data.meetings || data
    }
  } catch (error) {
    console.error('Error listing meetings:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Delete a meeting
 * @param {string} meetingId - Meeting ID
 * @returns {Promise<Object>} Deletion result
 */
export const deleteMeeting = async (meetingId) => {
  if (!isMeetYouLiveConfigured()) {
    throw new Error('MeetYouLive no está configurado')
  }

  try {
    const response = await fetch(`${MEETYOULIVE_API_URL}/meetings/${meetingId}`, {
      method: 'DELETE',
      headers: getHeaders()
    })

    if (!response.ok) {
      throw new Error(`Error al eliminar reunión: ${response.statusText}`)
    }

    return {
      success: true
    }
  } catch (error) {
    console.error('Error deleting meeting:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Generate a quick meeting URL (instant meeting)
 * @param {string} meetingName - Name for the meeting
 * @returns {Promise<Object>} Meeting URL
 */
export const createInstantMeeting = async (meetingName = 'Reunión Rápida') => {
  if (!isMeetYouLiveConfigured()) {
    throw new Error('MeetYouLive no está configurado. Por favor añade las credenciales en .env')
  }

  try {
    const response = await fetch(`${MEETYOULIVE_API_URL}/meetings/instant`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({
        title: meetingName,
        workspace_id: MEETYOULIVE_WORKSPACE_ID
      })
    })

    if (!response.ok) {
      throw new Error(`Error al crear reunión instantánea: ${response.statusText}`)
    }

    const data = await response.json()
    return {
      success: true,
      roomUrl: data.room_url || data.url,
      meetingId: data.id
    }
  } catch (error) {
    console.error('Error creating instant meeting:', error)
    return {
      success: false,
      error: error.message
    }
  }
}

/**
 * Test connection to MeetYouLive API
 * @returns {Promise<Object>} Connection status
 */
export const testConnection = async () => {
  if (!isMeetYouLiveConfigured()) {
    return {
      success: false,
      error: 'MeetYouLive no está configurado. Por favor añade las credenciales en .env',
      configured: false
    }
  }

  try {
    const response = await fetch(`${MEETYOULIVE_API_URL}/health`, {
      method: 'GET',
      headers: getHeaders()
    })

    if (!response.ok) {
      throw new Error(`Error de conexión: ${response.statusText}`)
    }

    return {
      success: true,
      configured: true,
      status: 'connected'
    }
  } catch (error) {
    console.error('Error testing connection:', error)
    return {
      success: false,
      configured: true,
      error: error.message
    }
  }
}

export default {
  isMeetYouLiveConfigured,
  createMeeting,
  getMeeting,
  listMeetings,
  deleteMeeting,
  createInstantMeeting,
  testConnection
}
