import { Divider, Grid2, Paper, Skeleton } from '@mui/material';

export const TaskLoadingSkeleton = () => {
  return (
    <Paper sx={{ p: 1 }}>
      <Grid2 container direction={'column'}>
        <Grid2 size={{ xs: 12 }}>
          <Grid2
            container
            direction={'row'}
            justifyContent={'space-between'}
            alignItems={'center'}
          >
            <Grid2 size={{ xs: 6 }}>
              <Skeleton
                variant="text"
                width={'100px'}
                sx={{ fontSize: '22px' }}
              />
            </Grid2>
            <Grid2>
              <Grid2
                container
                direction={'row'}
                justifyContent={'space-between'}
              >
                {Array.from(new Array(3)).map((item, index) => (
                  <Grid2>
                    <Skeleton
                      variant="circular"
                      width={30}
                      height={30}
                      sx={{ ml: 1 }}
                    />
                  </Grid2>
                ))}
              </Grid2>
            </Grid2>
          </Grid2>
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Divider sx={{ my: 1 }} />
        </Grid2>
        <Grid2 size={{ xs: 12 }}>
          <Grid2 container direction={'column'}>
            {['200px', '150px'].map((item, index) => (
              <Grid2 size={{ xs: 12 }}>
                <Skeleton
                  variant="text"
                  width={item}
                  sx={{ fontSize: '22px' }}
                />
              </Grid2>
            ))}
          </Grid2>
        </Grid2>
      </Grid2>
    </Paper>
  );
};
