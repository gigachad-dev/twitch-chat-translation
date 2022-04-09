package main

import (
	"encoding/json"
	"net/http"
	"os"

	"github.com/unrolled/render"
)

type Response []interface{}

func getJson(this interface{}, url string) error {
	res, err := http.Get(url)
	if err != nil {
		return err
	}
	defer res.Body.Close()

	return json.NewDecoder(res.Body).Decode(this)
}

func setDefaultHeaders(w http.ResponseWriter, r *http.Request) {
	w.Header().Set("Access-Control-Allow-Origin", "*")
	w.Header().Set("Access-Control-Allow-Methods", "*")
	w.Header().Set("Content-Type", "application/json")
	w.Header().Set("Origin", "X-Requested-With")
	w.Header().Set("X-Request-Url", r.URL.RequestURI())
}

func main() {
	ip := os.Getenv("APP_IP")
	port := os.Getenv("APP_PORT")
	// ip := ""
	// port := "8000"
	render := render.New()
	mux := http.NewServeMux()

	mux.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		setDefaultHeaders(w, r)

		url := r.URL.Query().Get("url")
		res := new(Response)
		getJson(res, url)

		render.JSON(w, http.StatusOK, res)
	})

	http.ListenAndServe(ip+":"+port, mux)
}
