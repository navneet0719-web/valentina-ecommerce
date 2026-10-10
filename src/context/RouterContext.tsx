import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { trackEvent } from '../utils/analytics';

interface RouterContextValue {
  pathname: string;
  search: string;
  navigate: (to: string, options?: { replace?: boolean }) => void;
}

const RouterContext = createContext<RouterContextValue>({
  pathname: '/',
  search: '',
  navigate: () => {},
});

export function normalizePathname(rawPath: string): string {
  if (!rawPath || rawPath === '/') return '/';
  const cleaned = rawPath.replace(/\/+$/, '');
  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`;
}

export const RouterProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locationState, setLocationState] = useState<{ pathname: string; search: string }>(() => ({
    pathname: normalizePathname(window.location.pathname),
    search: window.location.search || '',
  }));

  useEffect(() => {
    const handlePopState = () => {
      const nextPath = normalizePathname(window.location.pathname);
      const nextSearch = window.location.search || '';
      setLocationState({ pathname: nextPath, search: nextSearch });
      window.scrollTo({ top: 0, behavior: 'smooth' });
      trackEvent('page_view', { page_path: nextPath, page_search: nextSearch });
    };

    window.addEventListener('popstate', handlePopState);
    // Fire initial page_view
    trackEvent('page_view', {
      page_path: locationState.pathname,
      page_search: locationState.search,
    });
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = useCallback((to: string, options?: { replace?: boolean }) => {
    const [rawPath, rawQuery] = to.split('?');
    const normalizedPath = normalizePathname(rawPath);
    const searchStr = rawQuery ? `?${rawQuery}` : '';
    const fullUrl = `${normalizedPath}${searchStr}`;

    if (options?.replace) {
      window.history.replaceState({}, '', fullUrl);
    } else {
      window.history.pushState({}, '', fullUrl);
    }

    setLocationState({ pathname: normalizedPath, search: searchStr });
    window.scrollTo({ top: 0, behavior: 'smooth' });
    trackEvent('page_view', { page_path: normalizedPath, page_search: searchStr });
  }, []);

  return (
    <RouterContext.Provider
      value={{
        pathname: locationState.pathname,
        search: locationState.search,
        navigate,
      }}
    >
      {children}
    </RouterContext.Provider>
  );
};

export function useRouter() {
  return useContext(RouterContext);
}

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to: string;
  children: React.ReactNode;
}

export const Link: React.FC<LinkProps> = ({ to, onClick, children, ...rest }) => {
  const { navigate } = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.altKey ||
      e.ctrlKey ||
      e.shiftKey ||
      rest.target === '_blank'
    ) {
      return;
    }
    e.preventDefault();
    navigate(to);
  };

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  );
};
