import { useMutation, useQueryClient } from 'react-query';

// Define your login mutation function
const login = async (credentials: { username: string; password: string }) => {
  // Make your login API call here and return the response
  const response = await fetch(`${process.env.REACT_APP_API_URL}/auth/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(credentials),
  });
  if (!response.ok) {
    throw new Error('Login failed');
  }
  return response.json();
};

// Define your logout mutation function
const logout = async () => {
  // Make your logout API call here
  const response = await fetch(`${process.env.REACT_APP_API_URL}auth/logout/`, {
    method: 'POST',
  });
  if (!response.ok) {
    throw new Error('Logout failed');
  }
  
};

// Custom hook to handle authentication using React Query
const useAuth = () => {
  const queryClient = useQueryClient();

  // Login mutation
  const { mutate: loginMutation } = useMutation(login, {
    onSuccess: (data) => {
      // Save the authentication token or user data to local storage or state
      // localStorage.setItem('token', data.token);
      // navigate("/home");
    },
    onError: (error) => {
      // Handle login error
      console.error('Login error:', error);
      throw new Error('Login failed. Please check your credentials and try again.');
    },
  });

  // Logout mutation
  const { mutate: logoutMutation } = useMutation(logout, {
    onSuccess: () => {
      // Clear the authentication token or user data from local storage or state
      localStorage.removeItem('token');
      // Invalidate and refetch relevant queries
      queryClient.invalidateQueries('user');
    },
    onError: (error) => {
      // Handle logout error
      console.error('Logout error:', error);
      throw new Error('Logout failed. Please try again.');
    },
  });

  return {
    login: loginMutation,
    logout: logoutMutation,
  };
};

export default useAuth;